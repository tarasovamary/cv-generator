import { Injectable } from '@angular/core';
import { CV } from '../models/cv.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CvService {
  private apiUrl = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) {}

  getAllCv(employeeId: string) {
    return this.http.get<CV[]>(`${this.apiUrl}/${employeeId}/cv`);
  }
}
