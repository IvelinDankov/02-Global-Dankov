import { HttpClient } from "@angular/common/http";
import { inject, Injectable, OnInit, signal } from "@angular/core";
import { User } from "../../models/user.model.js";
import { Observable, tap } from "rxjs";

export interface AuthResponse {
  token: string;
  user: {
    _id: string;
    username: string;
    email: string;
  };
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  apiUrl = "http://localhost:3000";

  _currentUser = signal<User | null>(null);
  _isLoggedIn = signal(false);

  public currentUser = this._currentUser.asReadonly();
  public isLoggedIn = this._isLoggedIn.asReadonly();

  constructor(private http: HttpClient) {
    if (typeof localStorage !== "undefined") {
      const savedUser = localStorage.getItem("currentUser");

      if (savedUser) {
        const user = JSON.parse(savedUser);
        this._currentUser.set(user);
        this._isLoggedIn.set(true);
      }
    }
  }

  register(
    username: string,
    email: string,
    password: string,
    rePassword: string
  ): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(
        `${this.apiUrl}/register`,
        {
          username,
          email,
          password,
          rePassword,
        },
        { withCredentials: true }
      )
      .pipe(
        tap((res) => {
          this._currentUser.set(res.user);
          this._isLoggedIn.set(true);
          localStorage.setItem("currentUser", JSON.stringify(res.user));
        })
      );
  }
  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(
        `${this.apiUrl}/login`,
        { email, password },
        { withCredentials: true }
      )
      .pipe(
        tap((res) => {
          this._currentUser.set(res.user);
          this._isLoggedIn.set(true);
          localStorage.setItem("currentUser", JSON.stringify(res.user));
        })
      );
  }

  logout(): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/logout`, {}, { withCredentials: true })
      .pipe(
        tap(() => {
          this._currentUser.set(null);
          this._isLoggedIn.set(false);
          localStorage.removeItem("currentUser");
        })
      );
  }
}
