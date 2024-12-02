import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { Project } from '../../projects/models/project.model';
import { Observable, catchError, map, of } from 'rxjs';
import { selectProjectById } from '../store/cv.selectors';
import { CvState } from '../store/cv.state';

@Pipe({
  name: 'getProjectById$',
  standalone: true,
})
export class GetProjectByIdPipe implements PipeTransform {
  constructor(private store: Store<CvState>) {}

  transform(id: string): Observable<Project | null> {
    return this.store.select(selectProjectById(id)).pipe(
      map((project) => project),
      catchError(() => {
        console.error('Error getting project by ID');
        return of(null);
      }),
    );
  }
}
