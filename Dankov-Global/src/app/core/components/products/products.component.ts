import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from "@angular/core";
import { ProductService } from "../../../product.service.js";
import { Product } from "../../../models/product.model.js";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CurrencyPipe } from "@angular/common";
import { ActivatedRoute, RouterLink } from "@angular/router";
// import { Event } from "@angular/router";

@Component({
  selector: "app-products",
  imports: [ReactiveFormsModule, FormsModule, CurrencyPipe, RouterLink],
  templateUrl: "./products.component.html",
  styleUrl: "./products.component.scss",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductsComponent implements OnInit {
  productService = inject(ProductService);
  private activatedRoute = inject(ActivatedRoute);
  products: Product[] = [];
  isLoading: boolean = false;
  errorMsg: string = "";
  order?: "fruits" | "vegetables" = "fruits";

  sortProducts: {
    label: string;
    value: string;
  }[] = [
    { label: "all", value: "all" },
    { label: "Newest", value: "createdAt_desc" },
    { label: "Older to Newest", value: "createdAt_asc" },
    { label: "Price: Low to High", value: "price_asc" },
    { label: "Price: High to Low", value: "price_desc" },
  ];

  ngOnInit(): void {
    this.isLoading = true;

    this.activatedRoute.queryParams.subscribe((params) => {
      this.order = params["order"];

      this.products = this.products.filter(
        (product) => product.category == this.order
      );
    });

    this.productService.getAllProducts().subscribe({
      next: (allProducts: Product[]) => {
        this.isLoading = false;
        this.products = allProducts;
      },

      error: (error) => {
        this.isLoading = false;
        console.error(error);
        this.errorMsg = "Feild to load Products!";
      },
    });
  }

  onSortChange(event: any): void {
    const selectEl = (event.target as HTMLSelectElement).value;
    const [sortBy, order] = selectEl.split("_");

    this.productService
      .getSortedProducts(sortBy, order as "asc" | "desc")
      .subscribe({
        next: (products) => {
          this.products = products;
        },
        error: (err) => {
          console.error("Error fetching sorted products", err);
        },
      });
  }
}
