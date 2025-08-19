import { CommonModule, NgStyle } from "@angular/common";
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from "@angular/core";
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from "@angular/router";
import { filter } from "rxjs";
import { AuthService } from "../../../core/services/auth.service.js";

@Component({
  selector: "app-header",
  imports: [RouterLink, RouterLinkActive, CommonModule, NgStyle],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderComponent implements OnInit {
  headerBg: string = "";
  headertitle: string = "";
  containerClass: string = "hero hero-container container";

  private authService = inject(AuthService);
  private router = inject(Router);
  readonly isLoggedIn = this.authService._isLoggedIn;
  readonly currentUser = this.authService._currentUser;

  ngOnInit(): void {
    const currRoute = this.router.url;
    this.setHeaderContent(currRoute);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        this.setHeaderContent(e.urlAfterRedirects);
      });
  }

  private setHeaderContent(currRoute: string) {
    if (currRoute.includes("/home")) {
      this.headerBg = "url(/images/home/hero-img.png)";
      this.headertitle = "Your Global Partner. Creating a Better World";
      this.containerClass = "hero hero-container container";
    } else if (currRoute.includes("why-dankov")) {
      this.headerBg = "url(/images/why/why-hero-image.png)";
      this.headertitle = "Why Chioose Dankov Global";
      this.containerClass = "why why-container container";
    } else if (currRoute.includes("industries")) {
      this.headerBg = "url(/images/industrie/Industrie-main.png";
      this.headertitle = "Industries We Serve Products";
      this.containerClass = "industrie industrie-container container";
    } else if (/^\/products\/[^\/]+/.test(currRoute)) {
      this.headertitle = "Fresh Premium Quality Products";
      this.headerBg =
        "url(/images/product-details/Product-details-main-image.png)";
      this.containerClass =
        "product-details product-details-container container";
    } else if (currRoute.includes("products")) {
      this.headerBg = "url(/images/product/Product-main-image.png)";
      this.headertitle = "Distribute Premium Quality Products";
      this.containerClass = "product product-container container";
    } else if (currRoute.includes("global-facilities")) {
      this.headerBg = "url(/images/facillities/Facilities-hero.png)";
      this.headertitle = "20+ Locations Around the World Since 1999";
      this.containerClass = "global global-container container";
    } else if (currRoute.includes("company")) {
      this.headerBg = "url(/images/company/company-hero-image.png)";
      this.headertitle = "Read the Story About Our Company";
      this.containerClass = "company-hero company-hero-container container";
    } else if (currRoute.includes("create")) {
      this.headerBg = "url(/images/create/create-page-hero.png";
      this.headertitle = "Create your product";
      this.containerClass = "company-hero company-hero-container container";
    } else if (currRoute.includes("login") || currRoute.includes("register")) {
      this.containerClass = "sign-up-container container";
      this.headerBg = "";
      this.headertitle = "";
    } else if (currRoute.includes("not-found")) {
      this.containerClass = "sign-up-container container";
      this.headerBg = "";
      this.headertitle = "";
    } else {
      this.containerClass = "sign-up-container container container";
      this.headertitle = "";
      this.headerBg = "";
      // this.headerBg = "url(/images/home/hero-img.png)";
      // this.headertitle = "Your Global Partner. Creating a Better World";
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: (res) => {
        this.router.navigate(["/login"]);
        console.log(res);
      },
      error: (err) => {
        console.log("Error loggin out", err.message);
      },
    });
  }
}
