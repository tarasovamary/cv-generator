import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { Observable, Subject, filter, takeUntil, tap } from 'rxjs';
import { CV } from '../../../cv/models/cv.model';
import * as CvActions from '../../../cv/store/cv.actions';
import { selectAllCv } from '../../../cv/store/cv.selectors';
import { Employee } from '../../../employees/models/employee.model';
import { selectCurrentEmployee } from '../../../employees/store/employees.selectors';

@Component({
  selector: 'app-employee-cv',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgClass,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    RouterLink,
    ConfirmDialogModule,
    ToastModule,
  ],
  templateUrl: './employee-cv.component.html',
  styleUrl: './employee-cv.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class EmployeeCvComponent implements OnInit, OnDestroy {
  employeeId!: string;

  activeCvId!: string;
  cvForm!: UntypedFormGroup;
  isReadOnly = true;

  cvs$!: Observable<CV[]>;
  employee$!: Observable<Employee | null>;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: UntypedFormBuilder,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.employeeId = this.route.parent.snapshot.paramMap.get('id')!;
    this.store.dispatch(CvActions.getAllCv({ employeeId: this.employeeId }));

    this.cvs$ = this.store.select(selectAllCv);
    this.employee$ = this.store.select(selectCurrentEmployee);

    this.cvForm = this.fb.group({
      name: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      specialization: ['', Validators.required],
      department: ['', Validators.required],
      skills: [[], Validators.required],
      description: [''],
    });

    // Set the first CV as active
    this.cvs$
      .pipe(
        takeUntil(this.destroy$),
        filter(Boolean),
        tap((cvs) => {
          if (cvs.length > 0) {
            this.setActiveCv(cvs[0]);
          }
        }),
      )
      .subscribe();

    // Update CV form with employee info
    this.employee$
      .pipe(
        takeUntil(this.destroy$),
        filter(Boolean),
        tap((employee) => {
          this.cvForm.patchValue({
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
          });
        }),
      )
      .subscribe();
  }

  onDeleteCv(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this cv?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Dispatch delete CV action
        this.store.dispatch(CvActions.deleteCvById({ id }));
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelled',
          detail: 'Cv deletion cancelled',
        });
      },
    });
  }

  onEditCv() {
    this.router.navigate(['/home/cv/', this.activeCvId]);
  }

  onCancel() {
    this.router.navigate(['../']);
  }

  setActiveCv(cv: CV) {
    this.activeCvId = cv._id;
    this.cvForm.patchValue(cv);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
