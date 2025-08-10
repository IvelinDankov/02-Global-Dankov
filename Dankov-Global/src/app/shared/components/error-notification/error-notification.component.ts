import { Component, inject } from "@angular/core";
import { ErrorService } from "../../../core/services/error.service.js";

@Component({
  selector: "app-error-notification",
  imports: [],
  templateUrl: "./error-notification.component.html",
  styleUrl: "./error-notification.component.scss",
})
export class ErrorNotificationComponent {
  private errorService = inject(ErrorService);

  readonly error = this.errorService.error;
}
