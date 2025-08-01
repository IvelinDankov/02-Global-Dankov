import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  inject,
  OnInit,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Product } from "../../../models/product.model.js";
import { CurrencyPipe } from "@angular/common";
import { ProductService } from "../../../core/services/product.service.js";
import { PriceDirective } from "../../../directives/price.directive.js";

@Component({
  selector: "app-product-details",
  imports: [CurrencyPipe, PriceDirective],
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

  showProductDescrition: boolean = false;
  showRefundDescrition: boolean = false;
  showShippingDescrition: boolean = false;

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
}
