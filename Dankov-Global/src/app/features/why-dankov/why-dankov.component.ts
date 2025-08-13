import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

@Component({
  selector: "app-why-dankov",
  imports: [],
  templateUrl: "./why-dankov.component.html",
  styleUrl: "./why-dankov.component.scss",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WhyDankovComponent {
  cssClass: boolean = false;
  cssClassP: boolean = false;

  showText() {
    this.cssClass = !this.cssClass;
  }
  showTextP() {
    this.cssClassP = !this.cssClassP;
  }
}
