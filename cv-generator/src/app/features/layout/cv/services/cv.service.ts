import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../../employees/models/employee.model';
import { CV } from '../models/cv.model';
import { Project } from '../../projects/models/project.model';
import { environment } from '../../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CvService {
  private apiUrl = environment.apiUrl + '/employees';
  private apiCvUrl = environment.apiUrl + '/cv';
  private apiProjectUrl = environment.apiUrl + '/projects';

  constructor(private http: HttpClient) {}
  getAllCvs() {
    return this.http.get<CV[]>(`${this.apiCvUrl}`);
  }

  getAllCvForEmployee(employeeId: string) {
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

  getAllProjects() {
    return this.http.get<Project[]>(this.apiProjectUrl);
  }
}
