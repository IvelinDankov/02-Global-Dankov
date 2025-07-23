import { Routes } from "@angular/router";

export const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  {
    path: "home",
    loadComponent: () =>
      import("./core/components/home/home.component.js").then(
        (m) => m.HomeComponent
      ),
  },
];
