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
    path: "create",
    loadComponent: () =>
      import(
        "./features/products/create-product/create-product.component.js"
      ).then((c) => c.CreateProductComponent),
  },
  {
    path: "global-facilities",
    loadComponent: () =>
      import("./features/facilities/facilities.component.js").then(
        (c) => c.FacilitiesComponent
      ),
  },
  {
    path: "company",
    loadComponent: () =>
      import("./features/company/company.component.js").then(
        (c) => c.CompanyComponent
      ),
  },
  {
    path: "sign-up",
    loadComponent: () =>
      import("./features/auth/sign-up/sign-up.component.js").then(
        (c) => c.SignUpComponent
      ),
  },
  {
    path: "register",
    loadComponent: () =>
      import("./features/auth/register/register.component.js").then(
        (c) => c.RegisterComponent
      ),
  },
  {
    path: "**",
    component: HomeComponent,
  },
];
