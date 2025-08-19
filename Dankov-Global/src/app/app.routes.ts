import { Routes } from "@angular/router";
import { NotFoundComponent } from "./shared/components/not-found/not-found.component.js";
import { guestGuard } from "./core/guards/guest.guard.js";
import { authGuard } from "./core/guards/authGuard.guard.js";
import { UnauthorizedComponent } from "./shared/components/unauthorized/unauthorized.component.js";
// import { PageNotFound } from "./shared/components/not-found/not-found.component.js";

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "home",
    loadComponent: () =>
      import("./features/home/home.component").then((c) => c.HomeComponent),
  },
  {
    path: "why-dankov",
    loadComponent: () =>
      import("./features/why-dankov/why-dankov.component").then(
        (c) => c.WhyDankovComponent
      ),
  },
  {
    path: "industries",
    loadComponent: () =>
      import("./features/industries/industries.component").then(
        (c) => c.IndustriesComponent
      ),
  },
  {
    path: "products",
    loadComponent: () =>
      import("./features/products/products.component").then(
        (c) => c.ProductsComponent
      ),
  },
  {
    path: "products/:id",
    loadComponent: () =>
      import(
        "./features/products/product-details/product-details.component"
      ).then((c) => c.ProductDetailsComponent),
  },
  {
    path: "create",
    loadComponent: () =>
      import(
        "./features/products/create-product/create-product.component"
      ).then((c) => c.CreateProductComponent),
    canActivate: [authGuard],
  },
  {
    path: "global-facilities",
    loadComponent: () =>
      import("./features/facilities/facilities.component").then(
        (c) => c.FacilitiesComponent
      ),
  },
  {
    path: "company",
    loadComponent: () =>
      import("./features/company/company.component").then(
        (c) => c.CompanyComponent
      ),
  },
  {
    path: "login",
    loadComponent: () =>
      import("./features/auth/login/login.component").then(
        (c) => c.LoginComponent
      ),
    canActivate: [guestGuard],
  },
  {
    path: "register",
    loadComponent: () =>
      import("./features/auth/register/register.component").then(
        (c) => c.RegisterComponent
      ),
    canActivate: [guestGuard],
  },
  {
    path: "contact",
    loadComponent: () =>
      import("./features/contact/contact.component").then(
        (c) => c.ContactComponent
      ),
  },

  {
    path: "unauthorized",
    component: UnauthorizedComponent,
  },

  {
    path: "not-found",

    component: NotFoundComponent,
  },
  {
    path: "**",

    redirectTo: "not-found",
  },
];
