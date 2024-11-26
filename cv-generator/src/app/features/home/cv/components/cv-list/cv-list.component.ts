import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Observable } from 'rxjs';
import { CV } from '../../models/cv.model';
import { GetEmployeeByIdPipe } from '../../pipes/get-employee-by-id.pipe';
import * as CvActions from '../../store/cv.actions';
import { selectAllCv } from '../../store/cv.selectors';

@Component({
  selector: 'app-cv-list',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    AsyncPipe,
    NgIf,
    RouterLink,
    ConfirmDialogModule,
    ToastModule,
    GetEmployeeByIdPipe,
  ],
  templateUrl: './cv-list.component.html',
  styleUrl: './cv-list.component.scss',
})
export class CvListComponent implements OnInit {
  cvs$: Observable<CV[]> = this.store.select(selectAllCv);

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.store.dispatch(CvActions.getAllCvEmployees());
    this.store.dispatch(CvActions.getAllCvs());
  }

  onSelect(id: string) {
    this.router.navigate(['../', id], { relativeTo: this.route });
  }

  onDelete(id: string, event: MouseEvent) {
    event.stopPropagation(); // Stops the click event that triggering the onSelect

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this cv?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
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
}
