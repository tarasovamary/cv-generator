import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Employee } from '../../employees/models/employee.model';
import { selectEmployeeById } from '../store/cv.selectors';

@Pipe({
  name: 'getEmployeeById$',
  standalone: true,
})
export class GetEmployeeByIdPipe implements PipeTransform {
  constructor(private store: Store) {}

  transform(id: string): Observable<Employee> {
    return this.store.select(selectEmployeeById(id));
  }
}
