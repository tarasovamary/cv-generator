import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { Project } from '../../projects/models/project.model';
import { Observable } from 'rxjs';
import { selectProjectById } from '../store/cv.selectors';

@Pipe({
  name: 'getProjectById$',
  standalone: true,
})
export class GetProjectByIdPipe implements PipeTransform {
  constructor(private store: Store) {}

  transform(id: string): Observable<Project> {
    return this.store.select(selectProjectById(id));
  }
}
