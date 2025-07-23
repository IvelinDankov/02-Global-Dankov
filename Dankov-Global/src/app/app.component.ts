import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from "@angular/core";
import { ProductService } from "./product.service.js";
import { Product } from "./models/product.model.js";
import { HeaderComponent } from "./core/components/header/header.component";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "./core/components/footer/footer.component";

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
