import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app-routing.module';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    //IMPORTANTE EL provideHttpClient SI NO, NO FUNCIONA
    provideRouter(routes), provideHttpClient(),
  ],
};
