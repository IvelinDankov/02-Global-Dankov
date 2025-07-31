import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "./models/product.model.js";

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
