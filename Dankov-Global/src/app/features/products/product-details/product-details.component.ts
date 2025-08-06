import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  inject,
  OnInit,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "../../../models/product.model.js";
import { CurrencyPipe } from "@angular/common";
import { ProductService } from "../../../core/services/product.service.js";
import { PriceDirective } from "../../../directives/price.directive.js";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-product-details",
  imports: [CurrencyPipe, PriceDirective, ReactiveFormsModule],
  templateUrl: "./product-details.component.html",
  styleUrl: "./product-details.component.scss",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  // readonly productId: string | null;
  private productService = inject(ProductService);
  private destroyRef = inject(DestroyRef);
  product: Product | undefined;
  productDiscount: number = 0;

  showProductDescrition: boolean = false;
  showRefundDescrition: boolean = false;
  showShippingDescrition: boolean = false;

  isEditing: boolean = false;

  productCategory: string[] = ["vegetables", "fruits"];

  private formBuilder = inject(FormBuilder);

  productForm: FormGroup;

  constructor() {
    this.productForm = this.formBuilder.group({
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

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");

    const subscription = this.productService.getOne(id).subscribe({
      next: (value) => {
        this.product = value;
        this.productDiscount = this.product.price / 0.8;
      },
      error: (err) => {
        console.log("Error fetching Product", err);
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  showDescrition(): void {
    this.showProductDescrition = !this.showProductDescrition;
    this.showRefundDescrition = false;
    this.showShippingDescrition = false;
  }
  showRefund() {
    this.showProductDescrition = false;
    this.showRefundDescrition = !this.showRefundDescrition;
    this.showShippingDescrition = false;
  }

  showShippingInfo() {
    this.showProductDescrition = false;
    this.showRefundDescrition = false;
    this.showShippingDescrition = !this.showShippingDescrition;
  }

  onRemoveItem(): void {
    const id = this.route.snapshot.paramMap.get("id");
    // alert("Are you sure? Do you realy want to delete this Product?");

    this.productService.removeItem(id).subscribe({
      next: () => console.log("Deleted!"),
      error: (err) => {
        console.log("Could not delete Product", err);
      },
    });
    this.router.navigate(["/products"]);
  }

  onEditItem() {
    const id = this.route.snapshot.paramMap.get("id");
    const subscription = this.productService.getOne(id).subscribe({
      next: (value) => {
        this.product = value;
      },
    });
    this.productForm.patchValue({
      name: this.product?.name,
      description: this.product?.description,
      price: this.product?.price,
      imageUrl: this.product?.imageUrl,
      category: this.product?.category,
      stock: this.product?.stock,
      rating: this.product?.rating,
      weight: this.product?.weight,
    });
    this.isEditing = true;

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  /* Validation´s  */

  get name(): AbstractControl<any | any> | null {
    return this.productForm.get("name");
  }
  get description(): AbstractControl<any, any> | null {
    return this.productForm.get("description");
  }
  get price(): AbstractControl<any, any> | null {
    return this.productForm.get("price");
  }
  get imageUrl(): AbstractControl<any, any> | null {
    return this.productForm.get("imageUrl");
  }
  get category(): AbstractControl<any, any> | null {
    return this.productForm.get("category");
  }
  get stock(): AbstractControl<any, any> | null {
    return this.productForm.get("stock");
  }
  get rating(): AbstractControl<any, any> | null {
    return this.productForm.get("rating");
  }
  get weight(): AbstractControl<any, any> | null {
    return this.productForm.get("weight");
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

  /*          export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  rating: number;
  weight: number;
}  */

  handleEdit(): void {
    const {
      name,
      description,
      price,
      imageUrl,
      category,
      stock,
      rating,
      weight,
    } = this.productForm.value;

    const product = <Product>{
      ...this.product,
      name,
      description,
      price,
      imageUrl,
      category,
      stock,
      rating,
      weight,
    };

    const subscription = this.productService
      .update(product)
      .subscribe((response) => {
        this.product = response;

        console.log(response);
      });

    this.isEditing = false;
    this.productForm.reset();

    this.router.navigate([`/products`]);

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  handleCancel(): void {
    this.isEditing = false;
    this.productForm.reset();
    this.router.navigate([`/products`]);
  }
}
