import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service.js";
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  let isLoggedIn = authService.isLoggedIn();

  return isLoggedIn ? true : router.createUrlTree(["/login"]);
};
