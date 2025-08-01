import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ProductComponent } from "./product/product.component";
import { WelcomeComponent } from "./welcome/welcome.component";

@Component({
  selector: "app-home",
  imports: [ProductComponent, WelcomeComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent {}
