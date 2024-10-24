import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [TableModule, ButtonModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent implements OnInit {
  employees: any[] = [];

  ngOnInit() {
    //TODO: Replace this with actual employee data fetching logic
    this.employees = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        department: 'HR',
        specialization: 'Recruiting',
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        department: 'Development',
        specialization: 'Frontend',
      },
    ];
  }
}
