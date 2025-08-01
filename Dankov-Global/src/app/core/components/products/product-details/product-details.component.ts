import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  inject,
  input,
  OnInit,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../../../../product.service.js";
import { Product } from "../../../../models/product.model.js";
import { CurrencyPipe } from "@angular/common";

@Component({
  selector: "app-product-details",
  imports: [CurrencyPipe],
  templateUrl: "./product-details.component.html",
  styleUrl: "./product-details.component.scss",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  // readonly productId: string | null;
  private productService = inject(ProductService);
  private destroyRef = inject(DestroyRef);
  product: Product | undefined;
  productDiscount: number = 0;

  productId = input.required<string>();

  constructor() {}

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
}
