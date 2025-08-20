import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnDestroy,
  OnInit,
} from "@angular/core";

import { Product } from "../../models/product.model.js";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CurrencyPipe } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { ProductService } from "../../core/services/product.service.js";
import { PriceDirective } from "../../directives/price.directive.js";
import { LikeService } from "../../core/services/like.service.js";
import { AuthService } from "../../core/services/auth.service.js";
import { HoverDirective } from "../../directives/hover.directive";
import { Subscription } from "rxjs";

@Component({
  selector: "app-products",
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CurrencyPipe,
    RouterLink,
    PriceDirective,
    HoverDirective,
  ],
  templateUrl: "./products.component.html",
  styleUrl: "./products.component.scss",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductsComponent implements OnInit, OnDestroy {
  private productService = inject(ProductService);
  private likeService = inject(LikeService);
  private authService = inject(AuthService);
  private router = inject(Router);

  private subs: Subscription[] = [];

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

    const sub1 = this.productService.getAllProducts().subscribe({
      next: (allProducts: Product[]) => {
        this.isLoading = false;
        this.products = allProducts;

        this.filteredProducts = [...this.products];
        if (this.authService._isLoggedIn()) {
          this.userLikedThisProduct();
        }
      },

      error: (err) => {
        this.isLoading = false;
        console.error(err);
        this.errorMsg = "Feild to load Products!";
      },
    });

    this.subs.push(sub1);
  }

  onSortChange(event: any): void {
    const selectEl = (event.target as HTMLSelectElement).value;

    if (selectEl === "all") {
      const sub2 = this.productService.getAllProducts().subscribe({
        next: (products) => {
          this.products = products;
          this.filteredProducts = [...this.products];

          this.onSearch();
        },
        error: (err) => {
          console.error("Error fetching all products", err);
        },
      });
      this.subs.push(sub2);
      return;
    }

    const [sortBy, order] = selectEl.split("_");

    const sub3 = this.productService
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

    this.subs.push(sub3);
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

  userLikedThisProduct() {
    this.products.forEach((product) => {
      const sub4 = this.likeService.checkIfUserLiked(product._id).subscribe({
        next: (res) => {
          product.isLiked = res.isLiked;
        },
        error: (err) => {
          console.log("Error checking like status", err.message);
        },
      });

      this.subs.push(sub4);
    });
  }

  toggleLike(product: Product): void {
    if (product.isLiked) {
      const sub5 = this.likeService.unlike(product._id).subscribe({
        next: (res) => {
          product.isLiked = false;

          product.likes = res.likes;
        },
        error: (err) => {
          console.log("Could not unlike product!", err.message);
        },
      });
      this.subs.push(sub5);
    } else {
      const sub6 = this.likeService.like(product._id).subscribe({
        next: (res) => {
          product.isLiked = true;
          product.likes = res.likes;
        },
        error: (err) => {
          console.log("Could not like the product", err.message);
        },
      });

      this.subs.push(sub6);
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }
}
