import { Component, inject } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../../core/services/auth.service.js";

@Component({
  selector: "app-sign-up",
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: "./sign-up.component.html",
  styleUrl: "./sign-up.component.scss",
})
export class SignUpComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  private formBuilder = inject(FormBuilder);

  loginForm: FormGroup;

  constructor() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  get email(): AbstractControl<any, any> | null {
    return this.loginForm.get("email");
  }
  get password(): AbstractControl<any, any> | null {
    return this.loginForm.get("password");
  }

  /* ERRORS */
  get emailError(): boolean {
    return (
      (this.email?.invalid && (this.email.touched || this.email.dirty)) || false
    );
  }
  get passwordError(): boolean {
    return (
      (this.password?.invalid &&
        (this.password.touched || this.password.dirty)) ||
      false
    );
  }

  /* ERROR MSGS */

  get emailErrorMsg(): string {
    if (this.email?.errors?.["required"]) {
      return "Email is required!";
    }
    if (this.email?.errors?.["email"]) {
      return "Email is not valid!";
    }

    return "";
  }
  get passwordErrorMsg(): string {
    if (this.password?.errors?.["required"]) {
      return "Password is required!";
    }
    if (this.password?.errors?.["minlength"]) {
      return "Password must be at least 6 characters long!";
    }

    return "";
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (res) => {
          if (res.user && res.token) {
            this.router.navigate(["/home"]);
          }
        },
        error: (error) => {
          console.log("Could not login: ", error);
        },
      });
    }
  }
}
