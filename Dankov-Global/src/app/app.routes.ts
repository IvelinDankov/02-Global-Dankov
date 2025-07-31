import { Routes } from "@angular/router";

export const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  {
    path: "home",
    loadComponent: () =>
      import("./core/components/home/home.component.js").then(
        (c) => c.HomeComponent
      ),
  },
  {
    path: "why-dankov",
    loadComponent: () =>
      import("./core/components/why-dankov/why-dankov.component.js").then(
        (c) => c.WhyDankovComponent
      ),
  },
  {
    path: "industries",
    loadComponent: () =>
      import("./core/components/industries/industries.component.js").then(
        (c) => c.IndustriesComponent
      ),
  },
  {
    path: "products",
    loadComponent: () =>
      import("./core/components/products/products.component.js").then(
        (c) => c.ProductsComponent
      ),
  },
  {
    path: "products/:id",
    loadComponent: () =>
      import(
        "./core/components/products/product-details/product-details.component.js"
      ).then((c) => c.ProductDetailsComponent),
  },
];
