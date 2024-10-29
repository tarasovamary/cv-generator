import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Observable } from 'rxjs';
import { Employee } from '../../../core/models/employee.model';
import { Store } from '@ngrx/store';
import { selectAllEmployees } from '../../../core/store/employees/employees.selectors';
import { getAllEmployees } from '../../../core/store/employees/employees.actions';
import { AsyncPipe, NgIf } from '@angular/common';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';

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
}
