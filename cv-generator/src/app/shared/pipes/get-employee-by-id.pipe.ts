import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../../features/home/employees/models/employee.model';
import { Store } from '@ngrx/store';
import { selectEmployeeById } from '../../features/home/employees/store/employees.selectors';

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
