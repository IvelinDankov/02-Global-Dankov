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

  private router = inject(Router);

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        const currRoute = e.urlAfterRedirects;
        if (currRoute.includes("industries")) {
          this.containerClass = "industrie industrie-container container";
        } else if (currRoute.includes("products")) {
          this.containerClass = "product product-container container";
        } else if (currRoute.includes(`products/:id`)) {
          this.containerClass =
            "product-details product-details-container container";
        } else {
          this.containerClass = "hero hero-container container";
        }
      });
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        const currRoute = e.urlAfterRedirects;

        if (currRoute.includes("/home")) {
          this.headerBg = "url(/images/home/hero-img.png)";
          this.headertitle = "Your Global Partner. Creating a Better World";
        } else if (currRoute.includes("why-dankov")) {
          this.headerBg = "url(/images/why/why-hero-image.png)";
          this.headertitle = "Why Chioose Dankov Global";
        } else if (currRoute.includes("industries")) {
          this.headerBg = "url(/images/industrie/Industrie-main.png)";
          this.headertitle = "Industries We Serve Products";
        } else if (/^\/products\/[^\/]+/.test(currRoute)) {
          this.headertitle = "Fresh Premium Quality Products";
          this.headerBg =
            "url(/images/product-details/Product-details-main-image.png)";
        } else if (currRoute.includes("products")) {
          this.headerBg = "url(/images/product/Product-main-image.png)";
          this.headertitle = "Distribute Premium Quality Products";
        }
      });
  }
}
