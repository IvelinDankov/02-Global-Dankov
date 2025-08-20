import { Component, effect, inject, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from "../../core/services/auth.service.js";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { User } from "../../models/user.model.js";
import { Subscription } from "rxjs";

@Component({
  selector: "app-profile",
  imports: [ReactiveFormsModule],
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.scss",
})
export class ProfileComponent implements OnInit, OnDestroy {
  public authService = inject(AuthService);

  isEditing: boolean = false;
  private subscriptions: Subscription[] = [];

  private formBuilder = inject(FormBuilder);

  profileForm: FormGroup;

  constructor() {
    this.profileForm = this.formBuilder.group({
      imageUrl: ["", [Validators.minLength(5)]],
      username: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.pattern(/^(?:\+3598[7-9]\d{7}|08[7-9]\d{7})$/)]],
    });
  }

  get imageUrl(): AbstractControl<any, any> | null {
    return this.profileForm.get("imageUrl");
  }

  get username(): AbstractControl<any, any> | null {
    return this.profileForm.get("username");
  }

  get email(): AbstractControl<any, any> | null {
    return this.profileForm.get("email");
  }
  get phone(): AbstractControl<any, any> | null {
    return this.profileForm.get("phone");
  }

  /* All errors */

  get imageUrlError(): boolean {
    return (
      (this.imageUrl?.invalid &&
        (this.imageUrl.touched || this.imageUrl.dirty)) ||
      false
    );
  }
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

  /* ERROR MSGS */

  get imageUrlErrorMsg(): string {
    if (this.imageUrl?.errors?.["minlength"]) {
      return "Image must be at least 5 characters long!";
    }

    return "";
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
    if (this.phone?.errors?.["pattern"]) {
      return "Phone must be valid. Bg mobile only!";
    }

    return "";
  }

  /* LOGIC */

  ngOnInit(): void {
    const user = this.authService.currentUser();
    if (user && this.isEditing) {
      this.profileForm.patchValue(user);
    }
  }

  onEdit() {
    this.isEditing = true;

    const user = this.authService.currentUser();

    this.profileForm.patchValue({
      imageUrl: user?.imageUrl,
      username: user?.username,
      email: user?.email,
      phone: user?.phone,
    });
  }

  onCancel() {
    this.isEditing = false;
    this.profileForm.reset();
  }

  onSave(): void {
    if (this.profileForm.valid) {
      const user = this.authService._currentUser();
      const { username, imageUrl, email, phone } = this.profileForm.value;

      const newUser = <User>{
        _id: user?._id,
        imageUrl,
        username,
        email,
        phone,
      };

      const subscribe = this.authService.updateUser(newUser).subscribe({
        next: (response) => {
          this.profileForm.patchValue(response);
          this.isEditing = false;
        },
        error: (err) => {
          console.log("Could not update user", err);
        },
      });

      this.subscriptions.push(subscribe);

      this.isEditing = false;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
