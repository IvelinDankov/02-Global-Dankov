import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ProductComponent } from "./product/product.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { WhyComponent } from "./why/why.component";
import { ReviewsComponent } from "./reviews/reviews.component";
import { CtaComponent } from "./cta/cta.component";
import { InstaComponent } from "./insta/insta.component";

@Component({
  selector: "app-home",
  imports: [
    ProductComponent,
    WelcomeComponent,
    WhyComponent,
    ReviewsComponent,
    CtaComponent,
    InstaComponent,
  ],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent {}
