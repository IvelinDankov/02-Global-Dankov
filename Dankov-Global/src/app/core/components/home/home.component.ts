import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ProductComponent } from "./product/product.component";

@Component({
  selector: "app-home",
  imports: [ProductComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent {
  cssClass: boolean = false;

  readMore() {
    this.cssClass = !this.cssClass;
  }
}
