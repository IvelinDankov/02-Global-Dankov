import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LikeService {
  private API_URL = "http://localhost:3000";
  constructor(private http: HttpClient) {}

  checkIfUserLiked(productId: string): Observable<any> {
    return this.http.get(`${this.API_URL}/products/isLiked/${productId}`, {
      withCredentials: true,
    });
  }

  like(productId: string): Observable<any> {
    return this.http.post(
      `${this.API_URL}/products/like/${productId}`,
      {},
      {
        withCredentials: true,
      }
    );
  }

  unlike(productId: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/products/like/${productId}`, {
      withCredentials: true,
    });
  }
}
