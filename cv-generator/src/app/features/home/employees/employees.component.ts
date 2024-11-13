import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Observable } from 'rxjs';
import { Employee } from './models/employee.model';
import { deleteEmployee, getAllEmployees } from './store/employees.actions';
import { selectAllEmployees } from './store/employees.selectors';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [TableModule, ButtonModule, AsyncPipe, NgIf, RouterOutlet, RouterLink, ConfirmDialogModule, ToastModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
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
      message: 'Are you sure you want to delete this employee?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(deleteEmployee({ id }));
        this.messageService.add({
          severity: 'success',
          summary: 'Deleted',
          detail: 'Employee deleted successfully',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Cancelled',
          detail: 'Employee deletion cancelled',
        });
      },
    });
  }
}
