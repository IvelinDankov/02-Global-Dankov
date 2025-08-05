import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { ProductService } from "../services/product.service.js";

export const productInterceptor: HttpInterceptorFn = (req, next) => {
  const productService = inject(ProductService);

  return next(req);
};
