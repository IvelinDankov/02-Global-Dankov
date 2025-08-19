import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import {
  provideRouter,
  withComponentInputBinding,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
} from "@angular/router";

import { routes } from "./app.routes";
import {
  provideClientHydration,
  withEventReplay,
} from "@angular/platform-browser";
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from "@angular/common/http";
import { errorInterceptorInterceptor } from "./core/interceptors/error-interceptor.interceptor.js";
import { tokenInterceptor } from "./core/interceptors/token.interceptor.js";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withEnabledBlockingInitialNavigation(),
      withComponentInputBinding(),
      withInMemoryScrolling({ scrollPositionRestoration: "top" })
    ),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withInterceptors([errorInterceptorInterceptor, tokenInterceptor]),
      withFetch()
    ),
  ],
};
