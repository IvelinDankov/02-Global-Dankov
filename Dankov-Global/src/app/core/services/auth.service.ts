import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { User } from "../../models/user.model.js";
import { map, Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  apiUrl = "http://localhost:3000";

  _currentUser = signal<User>({
    username: "",
    email: "",
    password: "",
    rePassword: "",
  });
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
  login(email: string, password: string): Observable<User> {
    return this.http
      .post<User>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        map((user) => <User>user),
        tap((user) => {
          this._currentUser.set(user);
          this._isLoggedIn.set(true);
          localStorage.setItem("currentUser", JSON.stringify(user));
        })
      );
  }

  logout() {
    this.http.delete(`${this.apiUrl}/logout`);
    this._currentUser.set({
      username: "",
      email: "",
      password: "",
      rePassword: "",
    });
    this._isLoggedIn.set(false);
  }
}
