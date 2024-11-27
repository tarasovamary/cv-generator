import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { StoreModule, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { devToolStoreConfig } from './configs/devToolsStore.config';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { AuthStoreModule } from './features/auth/store/auth.module';
import { CvStoreModule } from './features/layout/cv/store/cv.module';
import { EmployeesStoreModule } from './features/layout/employees/store/employees.module';
import { ProjectsStoreModule } from './features/layout/projects/store/projects.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore(),
    provideAnimations(),

    // Store
    importProvidersFrom(
      StoreModule.forRoot(),
      EffectsModule.forRoot(),
      AuthStoreModule,
      EmployeesStoreModule,
      CvStoreModule,
      ProjectsStoreModule,
    ),
    provideStoreDevtools(devToolStoreConfig),
    provideEffects(),
  ],
};
