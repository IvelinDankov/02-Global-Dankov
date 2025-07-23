import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from "@angular/core";
import { ProductService } from "../../../../product.service.js";
import { Product } from "../../../../models/product.model.js";

@Component({
  selector: "app-product",
  imports: [],
  templateUrl: "./product.component.html",
  styleUrl: "./product.component.scss",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];

  private productService = inject(ProductService);

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products;
      },
    });
  }
}
function next(value: Product[]): void {
  throw new Error("Function not implemented.");
}
