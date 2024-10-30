import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CvEffects } from './cv.effects';
import { cvReducer } from './cv.reducer';

@NgModule({
  imports: [StoreModule.forFeature('CV', cvReducer), EffectsModule.forFeature([CvEffects])],
})
export class CvStoreModule {}
