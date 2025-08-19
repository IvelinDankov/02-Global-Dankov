import { inject } from "@angular/core";
import { Router, CanActivateFn, UrlTree } from "@angular/router";

export const guestGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const router = inject(Router);

  let isLoggedIn = false;

  if (typeof window !== "undefined" && window.localStorage) {
    const user = localStorage.getItem("currentUser");
    isLoggedIn = user ? true : false;
  }

  if (isLoggedIn) {
    return router.parseUrl("/unauthorized");
  }

  return true;
};
