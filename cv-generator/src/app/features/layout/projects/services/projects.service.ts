import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';
import { environment } from '../../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private apiUrl = environment.apiUrl + '/projects';

  constructor(private http: HttpClient) {}

  getAllProjects() {
    return this.http.get<Project[]>(this.apiUrl);
  }

  getProjectById(id: string) {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }

  createProject(project: Project) {
    return this.http.post<Project>(this.apiUrl, project);
  }

  updateProject(id: string, payload: Partial<Project>) {
    return this.http.patch<Project>(`${this.apiUrl}/${id}`, payload);
  }

  deleteProjectById(id: string) {
    return this.http.delete<Project>(`${this.apiUrl}/${id}`);
  }
}
