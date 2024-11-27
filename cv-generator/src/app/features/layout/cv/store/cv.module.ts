import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CvEffects } from './cv.effects';
import { cvReducer } from './cv.reducer';
import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
  imports: [StoreModule.forFeature('CV', cvReducer), EffectsModule.forFeature([CvEffects])],
  providers: [MessageService, ConfirmationService],
})
export class CvStoreModule {}
