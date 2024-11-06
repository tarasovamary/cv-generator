import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CV } from '../models/cv.model';

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

  deleteCvById(id: string) {
    return this.http.delete<CV>(`${this.apiCvUrl}/${id}`);
  }
}
