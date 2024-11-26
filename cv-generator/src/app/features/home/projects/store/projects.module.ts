import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProjectsEffects } from './projects.effects';
import { projectsReducer } from './projects.reducer';

@NgModule({
  imports: [StoreModule.forFeature('PROJECTS', projectsReducer), EffectsModule.forFeature([ProjectsEffects])],
})
export class ProjectsStoreModule {}
