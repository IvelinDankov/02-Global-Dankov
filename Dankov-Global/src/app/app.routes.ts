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
  {
    path: "why-dankov",
    loadComponent: () =>
      import("./core/components/why-dankov/why-dankov.component.js").then(
        (m) => m.WhyDankovComponent
      ),
  },
  {
    path: "industries",
    loadComponent: () =>
      import("./core/components/industries/industries.component.js").then(
        (m) => m.IndustriesComponent
      ),
  },
  {
    path: "products",
    loadComponent: () =>
      import("./core/components/products/products.component.js").then(
        (m) => m.ProductsComponent
      ),
  },
];
