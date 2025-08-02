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

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        const currRoute = e.urlAfterRedirects;

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
        } else {
          this.containerClass = "hero hero-container container";
        }
      });
  }
}
