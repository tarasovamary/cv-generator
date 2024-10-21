import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from './auth.effects';
import { authReducer } from './auth.reducer';

@NgModule({
  imports: [StoreModule.forFeature('AUTH', authReducer), EffectsModule.forFeature([AuthEffects])],
})
export class AuthStoreModule {}
