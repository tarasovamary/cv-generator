import { AsyncPipe, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AccordionModule } from 'primeng/accordion';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { Observable, Subject, filter, takeUntil, tap } from 'rxjs';
import { Employee } from '../../../employees/models/employee.model';
import { selectCurrentEmployee } from '../../../employees/store/employees.selectors';
import { CV } from '../../models/cv.model';
import { GetProjectByIdPipe } from '../../pipes/get-project-by-id.pipe';
import * as CvActions from '../../store/cv.actions';
import { selectAllCv } from '../../store/cv.selectors';

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
    AccordionModule,
    GetProjectByIdPipe,
    DatePipe,
  ],
  templateUrl: './employee-cv.component.html',
  styleUrl: './employee-cv.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    this.store.dispatch(CvActions.getAllProjects());

    // Get employeeId and load CVs
    this.employeeId = this.route.parent.snapshot.paramMap.get('id')!;
    this.store.dispatch(CvActions.getAllCvForEmployee({ employeeId: this.employeeId }));

    this.cvForm = this.fb.group({
      name: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      specialization: ['', Validators.required],
      department: ['', Validators.required],
      skills: [[], Validators.required],
      projects: [[]],
      description: [''],
    });

    // Monitor changes to the CV list and set the active CV
    this.cvs$ = this.store.select(selectAllCv);
    this.cvs$
      .pipe(
        takeUntil(this.destroy$),
        filter((cvs) => cvs.length > 0),
        tap((cvs) => this.setActiveCvFromQueryOrFirst(cvs)),
      )
      .subscribe();

    // Update employee info
    this.employee$ = this.store.select(selectCurrentEmployee);
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

  setActiveCvFromQueryOrFirst(cvs: CV[]): void {
    const queryCvId = this.route.snapshot.queryParamMap.get('id');
    const activeCv = cvs.find((cv) => cv._id === queryCvId) || cvs[0];
    this.setActiveCv(activeCv);
  }

  setActiveCv(cv: CV) {
    this.store.dispatch(CvActions.setCurrentCv({ cv }));
    this.activeCvId = cv._id;
    this.cvForm.patchValue(cv);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { id: cv._id },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
