import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Observable } from 'rxjs';
import { Employee } from './models/employee.model';
import { deleteEmployee, getAllEmployees } from './store/employees.actions';
import { selectAllEmployees } from './store/employees.selectors';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [TableModule, ButtonModule, AsyncPipe, NgIf, RouterOutlet, RouterLink, ConfirmDialogModule, ToastModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService, MessageService],
})
export class EmployeesComponent implements OnInit {
  employees$: Observable<Employee[]> = this.store.select(selectAllEmployees);

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.store.dispatch(getAllEmployees());
  }

  onEmployeeSelect(id: string) {
    this.router.navigate([id], { relativeTo: this.route });
  }

  onDeleteEmployee(id: string, event: MouseEvent) {
    event.stopPropagation(); // Stops the click event that triggering the onEmployeeSelect

    this.confirmationService.confirm({
      message:
        'Are you sure you want to delete this employee? All CVs associated with the employee will also be deleted.',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(deleteEmployee({ id }));
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelled',
          detail: 'Employee deletion cancelled',
        });
      },
    });
  }
}
