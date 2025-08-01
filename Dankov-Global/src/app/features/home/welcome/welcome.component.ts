import { Component } from "@angular/core";

@Component({
  selector: "app-welcome",
  imports: [],
  templateUrl: "./welcome.component.html",
  styleUrl: "./welcome.component.scss",
})
export class WelcomeComponent {
  cssClass: boolean = false;

  readMore() {
    this.cssClass = !this.cssClass;
  }
}
