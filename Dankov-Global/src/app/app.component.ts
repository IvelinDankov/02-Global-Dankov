import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from "@angular/core";
import { Product } from "./models/product.model.js";
import { HeaderComponent } from "./shared/components/header/header.component.js";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "./shared/components/footer/footer.component.js";
import { ProductService } from "./core/services/product.service.js";

@Component({
  selector: "app-root",
  imports: [HeaderComponent, RouterOutlet, FooterComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit {
  title = "Dankov-Global";

  productService = inject(ProductService);

  products: Product[] | null = null;

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
      },
      error: (err: string) => {
        console.error("Error fetching products:", err);
        this.products = [];
      },
    });
  }
}
