import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-header",
  imports: [RouterLink],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderComponent {}
