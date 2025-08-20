import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnDestroy,
  OnInit,
} from "@angular/core";

import { RouterLink } from "@angular/router";
import { Product } from "../../../models/product.model.js";
import { ProductService } from "../../../core/services/product.service.js";
import { Subscription } from "rxjs";

@Component({
  selector: "app-product",
  imports: [RouterLink],
  templateUrl: "./product.component.html",
  styleUrl: "./product.component.scss",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  errMsg: string = "";
  loading: boolean = false;

  private subs = new Subscription();

  private productService = inject(ProductService);

  ngOnInit(): void {
    this.loading = true;
    this.subs = this.productService.getAllProducts().subscribe({
      next: (products: Product[]) => {
        this.loading = false;
        this.products = products.slice(0, 8);
      },
      error: (error) => {
        this.loading = false;
        console.error("Error", error);
        this.errMsg = "Failed to load Products!!!";
      },
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
function next(value: Product[]): void {
  throw new Error("Function not implemented.");
}
