import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private apiUrl = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) {}

  getAllEmployees() {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  getEmployeeById(id: string) {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  createEmployee(employee: Employee) {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  updateEmployee(id: string, payload: Partial<Employee>) {
    return this.http.patch<Employee>(this.apiUrl, payload);
  }

  deleteEmployee(id: string) {
    return this.http.delete<Employee>(`${this.apiUrl}/${id}`);
  }
}
