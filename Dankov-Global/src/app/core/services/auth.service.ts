import { HttpClient } from "@angular/common/http";
import { inject, Injectable, OnInit, signal } from "@angular/core";
import { User } from "../../models/user.model.js";
import { Observable, tap } from "rxjs";

export interface AuthResponse {
  token: string;
  user: {
    _id: string;
    imageUrl: string;
    username: string;
    email: string;
    phone: string;
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
    phone: string,
    password: string,
    rePassword: string
  ): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(
        `${this.apiUrl}/register`,
        {
          username,
          email,
          phone,
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

  updateUser(user: User): Observable<User> {
    return this.http
      .put<User>(
        `${this.apiUrl}/update`,

        user,

        { withCredentials: true }
      )
      .pipe(
        tap((updatedUser) => {
          this._currentUser.set(updatedUser);
          localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        })
      );
  }

/*   private handleAuthSuccess(res: AuthResponse) {
    this._currentUser.set(res.user);
    this._isLoggedIn.set(true);
    localStorage.setItem("currentUser", JSON.stringify(res.user));
  } */
}
