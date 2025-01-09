import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { environment } from '../../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private apiUrl = environment.apiUrl + '/employees';

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
    return this.http.patch<Employee>(`${this.apiUrl}/${id}`, payload);
  }

  deleteEmployee(id: string) {
    return this.http.delete<Employee>(`${this.apiUrl}/${id}`);
  }
}
