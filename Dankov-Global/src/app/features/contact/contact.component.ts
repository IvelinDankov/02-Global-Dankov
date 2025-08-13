import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { Component } from "@angular/core";

@Component({
  selector: "app-contact",
  imports: [],
  templateUrl: "./contact.component.html",
  styleUrl: "./contact.component.scss",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ContactComponent {
  email: string = "info@dankovglobal.com";
}
