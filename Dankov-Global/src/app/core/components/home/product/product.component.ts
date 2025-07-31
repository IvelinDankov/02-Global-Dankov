import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from "@angular/core";
import { ProductService } from "../../../../product.service.js";
import { Product } from "../../../../models/product.model.js";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-product",
  imports: [RouterLink],
  templateUrl: "./product.component.html",
  styleUrl: "./product.component.scss",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  errMsg: string = "";
  loading: boolean = false;

  private productService = inject(ProductService);

  ngOnInit(): void {
    this.loading = true;
    this.productService.getAllProducts().subscribe({
      next: (products: Product[]) => {
        this.loading = false;
        this.products = products;
      },
      error: (error) => {
        this.loading = false;
        console.error("Error", error);
        this.errMsg = "Failed to load Products!!!";
      },
    });
  }
}
function next(value: Product[]): void {
  throw new Error("Function not implemented.");
}
