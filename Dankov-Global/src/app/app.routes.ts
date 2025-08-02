import { Routes } from "@angular/router";
import { HomeComponent } from "./features/home/home.component.js";

export const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  {
    path: "home",
    loadComponent: () =>
      import("./features/home/home.component.js").then((c) => c.HomeComponent),
  },
  {
    path: "why-dankov",
    loadComponent: () =>
      import("./features/why-dankov/why-dankov.component.js").then(
        (c) => c.WhyDankovComponent
      ),
  },
  {
    path: "industries",
    loadComponent: () =>
      import("./features/industries/industries.component.js").then(
        (c) => c.IndustriesComponent
      ),
  },
  {
    path: "products",
    loadComponent: () =>
      import("./features/products/products.component.js").then(
        (c) => c.ProductsComponent
      ),
  },
  {
    path: "products/:id",
    loadComponent: () =>
      import(
        "./features/products/product-details/product-details.component.js"
      ).then((c) => c.ProductDetailsComponent),
  },
  {
    path: "global-facilities",
    loadComponent: () =>
      import("./features/facilities/facilities.component.js").then(
        (c) => c.FacilitiesComponent
      ),
  },
  {
    path: "**",
    component: HomeComponent,
  },
];
