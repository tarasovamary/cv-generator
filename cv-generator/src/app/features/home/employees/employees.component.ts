import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Observable } from 'rxjs';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import { Employee } from './models/employee.model';
import { deleteEmployee, getAllEmployees } from './store/employees.actions';
import { selectAllEmployees } from './store/employees.selectors';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [TableModule, ButtonModule, AsyncPipe, NgIf, CreateEmployeeComponent, RouterOutlet, RouterLink],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent implements OnInit {
  employees$: Observable<Employee[]> = this.store.select(selectAllEmployees);

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.store.dispatch(getAllEmployees());
  }

  onEmployeeSelect(id: string) {
    this.router.navigate([id], { relativeTo: this.route });
  }

  onDeleteEmployee(id: string, event: MouseEvent) {
    event.stopPropagation(); // Stops the click event that triggering the onEmployeeSelect

    this.store.dispatch(deleteEmployee({ id }));
  }
}
