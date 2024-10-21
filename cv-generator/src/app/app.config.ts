import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { StoreModule, provideStore } from '@ngrx/store';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { devToolStoreConfig } from './configs/devToolsStore.config';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthStoreModule } from './core/store/auth/auth.module';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore(),

    // Store
    importProvidersFrom(StoreModule.forRoot(), EffectsModule.forRoot(), AuthStoreModule),
    provideStoreDevtools(devToolStoreConfig),
    provideEffects(),
  ],
};
