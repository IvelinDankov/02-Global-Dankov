import { Component, inject } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../../core/services/auth.service.js";

@Component({
  selector: "app-register",
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss",
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  registerForm: FormGroup;

  constructor() {
    this.registerForm = this.formBuilder.group({
      username: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.minLength(14)]],
      passwords: this.formBuilder.group(
        {
          password: ["", [Validators.required, Validators.minLength(6)]],
          rePassword: ["", [Validators.required]],
        },
        {
          validators: this.passwordMatcherFn,
        }
      ),
    });
  }

  get username(): AbstractControl<any, any> | null {
    return this.registerForm.get("username");
  }
  get email(): AbstractControl<any, any> | null {
    return this.registerForm.get("email");
  }
  get phone(): AbstractControl<any, any> | null {
    return this.registerForm.get("phone");
  }
  get passwords(): FormGroup {
    return this.registerForm.get("passwords") as FormGroup;
  }

  get password(): AbstractControl<any, any> | null {
    return this.passwords.get("password");
  }

  get rePassword(): AbstractControl<any, any> | null {
    return this.passwords.get("rePassword");
  }

  /* Take all errors */

  get usernameError(): boolean {
    return (
      (this.username?.invalid &&
        (this.username.touched || this.username.dirty)) ||
      false
    );
  }

  get emailError(): boolean {
    return (
      (this.email?.invalid && (this.email.touched || this.email.dirty)) || false
    );
  }
  get phoneError(): boolean {
    return (
      (this.phone?.invalid && (this.phone.touched || this.phone.dirty)) || false
    );
  }
  get passwordsError(): boolean {
    return (
      (this.passwords?.invalid &&
        (this.passwords.touched || this.passwords.dirty)) ||
      false
    );
  }

  get usernameErrorMsg(): string {
    if (this.username?.errors?.["required"]) {
      return "Username is required!";
    }
    if (this.username?.errors?.["minlength"]) {
      return "Username must be at least 5 characters long!";
    }

    return "";
  }

  get emailErrorMsg(): string {
    if (this.email?.errors?.["required"]) {
      return "Email is required!";
    }
    if (this.email?.errors?.["email"]) {
      return "Email is not valid!";
    }

    return "";
  }
  get phoneErrorMsg(): string {
    if (this.phone?.errors?.["minlength"]) {
      return "Phone must be at least 14 characters long!";
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
  get rePasswordErrorMsg(): string {
    if (this.rePassword?.errors?.["required"]) {
      return "Re-Password is required!";
    }
    if (this.passwords?.errors?.["passwordMismatch"]) {
      return "Password & Re-Password needs to be the same!";
    }

    return "";
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { username, email, phone } = this.registerForm.value;
      const { password, rePassword } = this.registerForm.value.passwords;

      this.authService
        .register(username, email, phone, password, rePassword)
        .subscribe({
          next: (res) => {
            if (res) {
              this.router.navigate(["/home"]);
            }
          },
          error: (err) => {
            console.log("Could not create User", err);
            this.registerForm.markAllAsTouched();
          },
        });
    }
  }

  passwordMatcherFn(control: AbstractControl): ValidationErrors | null {
    const password = control.get("password");
    const rePassword = control.get("rePassword");

    if (password && rePassword && password.value !== rePassword.value) {
      return { passwordMismatch: true };
    } else {
      return null;
    }
  }
}
