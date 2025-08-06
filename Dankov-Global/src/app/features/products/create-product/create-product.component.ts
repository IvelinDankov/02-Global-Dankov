import { Component, inject } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Product } from "../../../models/product.model.js";
import { ProductService } from "../../../core/services/product.service.js";
import { Router } from "@angular/router";

@Component({
  selector: "app-create-product",
  imports: [ReactiveFormsModule],
  templateUrl: "./create-product.component.html",
  styleUrl: "./create-product.component.scss",
})
export class CreateProductComponent {
  private productService = inject(ProductService);
  private router = inject(Router);

  productCategory: string[] = ["vegetables", "fruits"];

  private formBuilder = inject(FormBuilder);

  createForm: FormGroup;

  constructor() {
    this.createForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(4)]],
      description: ["", Validators.minLength(10)],
      price: ["", [Validators.required, Validators.min(0)]],
      imageUrl: ["", [Validators.required]],
      category: ["", Validators.required],
      stock: ["", Validators.required],
      rating: [""],
      weight: [
        "",
        [Validators.required, Validators.min(0), Validators.max(1000)],
      ],
    });
  }

  /* Validation´s  */

  get name(): AbstractControl<any | any> | null {
    return this.createForm.get("name");
  }
  get description(): AbstractControl<any, any> | null {
    return this.createForm.get("description");
  }
  get price(): AbstractControl<any, any> | null {
    return this.createForm.get("price");
  }
  get imageUrl(): AbstractControl<any, any> | null {
    return this.createForm.get("imageUrl");
  }
  get category(): AbstractControl<any, any> | null {
    return this.createForm.get("category");
  }
  get stock(): AbstractControl<any, any> | null {
    return this.createForm.get("stock");
  }
  get rating(): AbstractControl<any, any> | null {
    return this.createForm.get("rating");
  }
  get weight(): AbstractControl<any, any> | null {
    return this.createForm.get("weight");
  }
  /* Errors */
  get nameError(): boolean {
    return (
      (this.name?.invalid && (this.name.touched || this.name.dirty)) || false
    );
  }
  get descriptionError(): boolean {
    return (
      (this.description?.invalid &&
        (this.description.touched || this.description.dirty)) ||
      false
    );
  }
  get priceError(): boolean {
    return (
      (this.price?.invalid && (this.price.touched || this.price.dirty)) || false
    );
  }
  get imageUrlError(): boolean {
    return (
      (this.imageUrl?.invalid &&
        (this.imageUrl.touched || this.imageUrl.dirty)) ||
      false
    );
  }
  get categoryError(): boolean {
    return (
      (this.category?.invalid &&
        (this.category.touched || this.category.dirty)) ||
      false
    );
  }
  get stockError(): boolean {
    return (
      (this.stock?.invalid && (this.stock.touched || this.stock.dirty)) || false
    );
  }
  get ratingError(): boolean {
    return (
      (this.rating?.invalid && (this.rating.touched || this.rating.dirty)) ||
      false
    );
  }
  get weightError(): boolean {
    return (
      (this.weight?.invalid && (this.weight.touched || this.weight.dirty)) ||
      false
    );
  }
  /* MSG */
  get nameErrorMsg(): string {
    if (this.name?.errors?.["required"]) {
      return "Name is required!";
    }
    if (this.name?.errors?.["minlength"]) {
      return "Name must be at least 4 characters long!";
    }
    return "";
  }
  get descriptionErrorMsg(): string {
    if (this.description?.errors?.["minlength"]) {
      return "Description min length must be 10 charachters!";
    }
    return "";
  }

  get priceErrorMsg(): string {
    if (this.price?.errors?.["required"]) {
      return "Price is required!";
    }
    if (this.price?.errors?.["min"]) {
      return "Price min value must be positive number!";
    }
    return "";
  }
  get imageUrlErrorMsg(): string {
    if (this.imageUrl?.errors?.["required"]) {
      return "ImageUrl is required!";
    }
    if (this.imageUrl?.errors?.["pattern"]) {
      return "ImageUrl is not valid!";
    }
    return "";
  }
  get categoryErrorMsg(): string {
    if (this.category?.errors?.["required"]) {
      return "Category is required!";
    }

    return "";
  }
  get stockErrorMsg(): string {
    if (this.stock?.errors?.["required"]) {
      return "Stock is required!";
    }

    return "";
  }
  get weightErrorMsg(): string {
    if (this.weight?.errors?.["required"]) {
      return "Weight is required!";
    }
    if (this.weight?.errors?.["min"]) {
      return "Weight must be a positive number!";
    }
    if (this.weight?.errors?.["max"]) {
      return "Weight must be maximal 100!";
    }

    return "";
  }

  onCreateProduct(): void {
    const {
      name,
      description,
      price,
      imageUrl,
      category,
      stock,
      rating,
      weight,
    } = this.createForm.value;

    /* 
      _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
  rating: number;
  weight: number;
    */

    const newProduct = <Product>{
      name,
      description,
      price,
      imageUrl,
      category,
      stock,
      rating: 1,
      weight,
    };

    this.productService.create(newProduct).subscribe({
      next: (res) => console.log(res),
      error: (err) => {
        console.log("Could not create Product", err);
      },
    });

    this.router.navigate(["/products"]);
  }
}
