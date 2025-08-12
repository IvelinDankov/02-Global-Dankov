import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from "@angular/core";

import { Product } from "../../models/product.model.js";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CurrencyPipe } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { ProductService } from "../../core/services/product.service.js";
import { PriceDirective } from "../../directives/price.directive.js";
import { AuthService } from "../../core/services/auth.service.js";

@Component({
  selector: "app-products",
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CurrencyPipe,
    RouterLink,
    PriceDirective,
  ],
  templateUrl: "./products.component.html",
  styleUrl: "./products.component.scss",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductsComponent implements OnInit {
  private productService = inject(ProductService);
  private authService = inject(AuthService);
  private router = inject(Router);
  products: Product[] = [];
  filteredProducts: Product[] = [];
  isLoading: boolean = false;
  errorMsg: string = "";
  selectedSort: string = "all";
  searchTerm: string = "";
  isLiked: boolean = true;

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

    this.productService.getAllProducts().subscribe({
      next: (allProducts: Product[]) => {
        this.isLoading = false;
        this.products = allProducts;

        this.filteredProducts = [...this.products];
      },

      error: (err) => {
        this.isLoading = false;
        console.error(err);
        this.errorMsg = "Feild to load Products!";
      },
    });
  }

  onSortChange(event: any): void {
    const selectEl = (event.target as HTMLSelectElement).value;

    if (selectEl === "all") {
      this.productService.getAllProducts().subscribe({
        next: (products) => {
          this.products = products;
          this.filteredProducts = [...this.products];

          this.onSearch();
        },
        error: (err) => {
          console.error("Error fetching all products", err);
        },
      });
      return;
    }

    const [sortBy, order] = selectEl.split("_");

    this.productService
      .getSortedProducts(sortBy, order as "asc" | "desc")
      .subscribe({
        next: (products) => {
          this.filteredProducts = products;
          this.products = products;
        },
        error: (err) => {
          console.error("Error fetching sorted products", err);
        },
      });
  }

  onSearch() {
    const term = this.searchTerm.toLocaleLowerCase().trim();
    this.filteredProducts = this.products.filter((product) => {
      return product.name.toLowerCase().includes(term);
    });
  }

  showDetails(productId: string) {
    this.router.navigate([`/products/${productId}`]);
    console.log(`CurProductId: ` + productId);
  }

  // onUnlike(product: Product) {
  //   const userId = this.authService.currentUser()?._id;

  //   if (!userId) {
  //     return;
  //   }

  //   this.productService.unlike(product._id).subscribe({
  //     next: () => {
  //       product.like = product.like.filter((id) => id !== userId);
  //     },
  //   });
  // }
}
