import { ApplicationConfig, InjectionToken, inject, EnvironmentInjector, runInInjectionContext, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export interface AppConfig {
  apiEndpoint: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export function loadAppConfig(injector: EnvironmentInjector) {
  return runInInjectionContext(injector, () => {
    const http = inject(HttpClient);
    return http.get('assets/config.json');
  });
}

export function appConfigFactory(): AppConfig {
  return (window as any).__APP_CONFIG__;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    { provide: APP_CONFIG, useFactory: appConfigFactory },
    {
      provide: 'APP_CONFIG_LOADER',
      multi: true,
      useFactory: () => {
        const injector = inject(EnvironmentInjector);
        return () => loadAppConfig(injector);
      }
    }
  ]
};