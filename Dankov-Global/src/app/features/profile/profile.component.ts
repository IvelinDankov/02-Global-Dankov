import { Component, effect, inject, OnInit } from "@angular/core";
import { AuthService } from "../../core/services/auth.service.js";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { User } from "../../models/user.model.js";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile",
  imports: [ReactiveFormsModule],
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.scss",
})
export class ProfileComponent implements OnInit {
  public authService = inject(AuthService);
  private router = inject(Router);

  isEditing: boolean = false;

  private formBuilder = inject(FormBuilder);

  profileForm: FormGroup;

  constructor() {
    this.profileForm = this.formBuilder.group({
      imageUrl: [""],
      username: [""],
      email: [""],
      phone: [""],
    });
  }

  ngOnInit(): void {
    effect(() => {
      const user = this.authService.currentUser();
      if (user && this.isEditing) {
        this.profileForm.patchValue(user);
      }
    });
  }

  onEdit() {
    this.isEditing = true;

    const user = this.authService.currentUser();

    this.profileForm.patchValue({
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
      const { username, email, phone } = this.profileForm.value;

      const newUser = <User>{
        _id: user?._id,
        username,
        email,
        phone,
      };

      this.authService.updateUser(newUser).subscribe({
        next: (response) => {
          this.profileForm.patchValue(response);
          this.isEditing = false;
        },
        error: (err) => {
          console.log("Could not update user", err);
        },
      });

      this.isEditing = false;
    }
  }
}
