import { Routes } from "@angular/router";
import { NotFoundComponent } from "./shared/components/not-found/not-found.component.js";
import { guestGuard } from "./core/guards/guest.guard.js";
import { authGuard } from "./core/guards/authGuard.guard.js";

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "home",
    loadComponent: () =>
      import("./features/home/home.component").then((c) => c.HomeComponent),
    title: "Home Page",
  },
  {
    path: "why-dankov",
    loadComponent: () =>
      import("./features/why-dankov/why-dankov.component").then(
        (c) => c.WhyDankovComponent
      ),
    title: "Why Dankov",
  },
  {
    path: "industries",
    loadComponent: () =>
      import("./features/industries/industries.component").then(
        (c) => c.IndustriesComponent
      ),
    title: "Industries",
  },
  {
    path: "products",
    loadComponent: () =>
      import("./features/products/products.component").then(
        (c) => c.ProductsComponent
      ),
    title: "Product Page",
  },
  {
    path: "products/:id",
    loadComponent: () =>
      import(
        "./features/products/product-details/product-details.component"
      ).then((c) => c.ProductDetailsComponent),
    title: "Product Details",
  },
  {
    path: "create",
    loadComponent: () =>
      import(
        "./features/products/create-product/create-product.component"
      ).then((c) => c.CreateProductComponent),
    canActivate: [authGuard],
    title: "Create New Product",
  },
  {
    path: "global-facilities",
    loadComponent: () =>
      import("./features/facilities/facilities.component").then(
        (c) => c.FacilitiesComponent
      ),
    title: "Facilities",
  },
  {
    path: "company",
    loadComponent: () =>
      import("./features/company/company.component").then(
        (c) => c.CompanyComponent
      ),
    title: "Company",
  },
  {
    path: "login",
    loadComponent: () =>
      import("./features/auth/login/login.component").then(
        (c) => c.LoginComponent
      ),
    title: "Login",
  },
  {
    path: "register",
    loadComponent: () =>
      import("./features/auth/register/register.component").then(
        (c) => c.RegisterComponent
      ),
    canActivate: [guestGuard],
    title: "Register",
  },

  {
    path: "profile",
    loadComponent: () =>
      import("./features/profile/profile.component").then(
        (c) => c.ProfileComponent
      ),
    canActivate: [authGuard],
    title: "Profile",
  },
  {
    path: "contact",
    loadComponent: () =>
      import("./features/contact/contact.component").then(
        (c) => c.ContactComponent
      ),
    title: "Contact",
  },

  {
    path: "unauthorized",
    loadComponent: () =>
      import("./shared/components/unauthorized/unauthorized.component").then(
        (c) => c.UnauthorizedComponent
      ),
    title: "Unauthorized",
  },

  {
    path: "not-found",

    component: NotFoundComponent,
    title: "Not Found",
  },
  {
    path: "**",

    redirectTo: "not-found",
  },
];
