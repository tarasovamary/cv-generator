import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { EmployeesEffects } from './employees.effects';
import { employeesReducer } from './employees.reducer';

@NgModule({
  imports: [StoreModule.forFeature('EMPLOYEES', employeesReducer), EffectsModule.forFeature([EmployeesEffects])],
})
export class AuthStoreModule {}
