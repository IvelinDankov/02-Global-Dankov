import { TestBed } from "@angular/core/testing";
import { HttpInterceptorFn } from "@angular/common/http";

import { productInterceptor } from "./-product.interceptor.js";

describe("productInterceptor", () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => productInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it("should be created", () => {
    expect(interceptor).toBeTruthy();
  });
});
