import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, catchError, map, of } from 'rxjs';
import { Employee } from '../../employees/models/employee.model';
import { selectEmployeeById } from '../store/cv.selectors';
import { CvState } from '../store/cv.state';

@Pipe({
  name: 'getEmployeeById$',
  standalone: true,
})
export class GetEmployeeByIdPipe implements PipeTransform {
  constructor(private store: Store<CvState>) {}

  transform(id: string): Observable<Employee | null> {
    return this.store.select(selectEmployeeById(id)).pipe(
      map((employee) => employee),
      catchError(() => {
        console.error('Error getting employee by ID');
        return of(null);
      }),
    );
  }
}
