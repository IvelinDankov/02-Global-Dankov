import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { Product } from "../../../../models/product.model.js";
import { ProductService } from "../../../../core/services/product.service.js";
import { CurrencyPipe } from "@angular/common";
import { PriceDirective } from "../../../../directives/price.directive.js";
import { Subscription } from "rxjs";

@Component({
  selector: "app-product-carousel",
  imports: [CurrencyPipe, PriceDirective],
  templateUrl: "./product-carousel.component.html",
  styleUrl: "./product-carousel.component.scss",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductCarouselComponent implements OnInit, OnDestroy {
  private productService = inject(ProductService);
  products: Product[] = [];
  nextProducts: Product[] = [];

  private sub = new Subscription();

  ngOnInit(): void {
    this.sub = this.productService.getAllProducts().subscribe({
      next: (value) => {
        this.nextProducts = value;
        this.nextProducts = this.nextProducts.slice(4, 8);
        this.products = value;
        this.products = this.products.slice(0, 4);
      },
      error: (err) => {
        console.log("Could not show products", err.message);
      },
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
