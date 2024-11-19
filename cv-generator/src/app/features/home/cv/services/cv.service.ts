import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CV } from '../models/cv.model';
import { Employee } from '../../employees/models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class CvService {
  private apiUrl = 'http://localhost:3000/employees';
  private apiCvUrl = 'http://localhost:3000/cv';

  constructor(private http: HttpClient) {}

  getAllCv(employeeId: string) {
    return this.http.get<CV[]>(`${this.apiUrl}/${employeeId}/cv`);
  }

  getCvById(id: string) {
    return this.http.get<CV>(`${this.apiCvUrl}/${id}`);
  }

  deleteCvById(id: string) {
    return this.http.delete<CV>(`${this.apiCvUrl}/${id}`);
  }

  createCv(cv: CV) {
    return this.http.post<CV>(`${this.apiUrl}/${cv.employeeId}/cv`, cv);
  }

  updateCv(id: string, payload: Partial<CV>) {
    return this.http.patch<CV>(`${this.apiCvUrl}/${id}`, payload);
  }

  getAllEmployees() {
    return this.http.get<Employee[]>(this.apiUrl);
  }
}
