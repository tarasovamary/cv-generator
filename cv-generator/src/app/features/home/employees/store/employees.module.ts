import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { EmployeesEffects } from './employees.effects';
import { employeesReducer } from './employees.reducer';
import { MessageService } from 'primeng/api';

@NgModule({
  imports: [StoreModule.forFeature('EMPLOYEES', employeesReducer), EffectsModule.forFeature([EmployeesEffects])],
  providers: [MessageService],
})
export class EmployeesStoreModule {}
