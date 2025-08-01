import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-footer",
  imports: [RouterLink],
  templateUrl: "./footer.component.html",
  styleUrl: "./footer.component.scss",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FooterComponent {
  date = new Date().getFullYear();
}
