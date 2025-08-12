import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../../models/product.model.js";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private API_URL = "http://localhost:3000";
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL + "/products");
  }
  getSortedProducts(
    sortBy: string,
    order: "asc" | "desc"
  ): Observable<Product[]> {
    console.log("Fetching sorted products by:", sortBy, order);

    const params = new HttpParams().set("sortBy", sortBy).set("order", order);

    return this.http.get<Product[]>(`${this.API_URL}/products`, { params });
  }

  getOne(id: string | null) {
    return this.http.get<Product>(this.API_URL + `/products/${id}`, {
      withCredentials: true,
    });
  }

  removeItem(id: string | null) {
    return this.http.delete<Product>(this.API_URL + `/products/delete/${id}`, {
      withCredentials: true,
    });
  }

  update(product: Product) {
    return this.http.put<Product>(
      `${this.API_URL}/products/edit/${product._id}`,

      product,
      {
        withCredentials: true,
      }
    );
  }

  create(product: Product) {
    return this.http.post<Product>(`${this.API_URL}/create`, product, {
      withCredentials: true,
    });
  }
}
/* 
  private getPostApiUrl = "http://localhost:3000/api/posts?limit={0}";
  private createPostApiUser = "http://localhost:3000/api/posts";

  constructor(private httpClient: HttpClient) {}

  getPosts(limit: number = 5): Observable<Post[]> {
    return this.httpClient.get<Post[]>(
      this.getPostApiUrl.replace("{0}", limit.toString())
    );
  }
*/
