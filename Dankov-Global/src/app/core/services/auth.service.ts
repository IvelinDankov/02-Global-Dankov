import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { User } from "../../models/user.model.js";
import { map, Observable, tap } from "rxjs";

export interface AuthResponse {
  token: string;
  user: {
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
  ): Observable<User> {
    return this.http
      .post<User>(`${this.apiUrl}/register`, {
        username,
        email,
        password,
        rePassword,
      })
      .pipe(
        map((user) => <User>user),
        tap((user) => {
          this._currentUser.set(user);
          this._isLoggedIn.set(true);
          localStorage.setItem("currentUser", JSON.stringify(user));
        })
      );
  }
  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((res) => {
          this._currentUser.set(res.user);
          this._isLoggedIn.set(true);
          localStorage.setItem("currentUser", JSON.stringify(res.user));
        })
      );
  }

  logout() {
    this.http.delete(`${this.apiUrl}/logout`);
    this._currentUser.set(null);
    this._isLoggedIn.set(false);
    localStorage.removeItem("currentUser");
  }
}
