import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withHashLocation } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // 1. Remove provideZoneChangeDetection
    // 2. Add the zoneless provider:
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding(), withHashLocation()),
    provideHttpClient(withFetch())
  ]
};
