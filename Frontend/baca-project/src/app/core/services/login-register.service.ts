import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginRegisterService {
  private readonly baseUrl = environment.url;
  isLoggedIn$: Subject<boolean>;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {
    this.isLoggedIn$ = new BehaviorSubject<boolean>(true);
  }

  getIsLoggedIn() {
    return this.isLoggedIn$;
  }

  setIsLoggedIn(newSatate) {
    this.isLoggedIn$.next(newSatate);
  }

  setCurrentUser(user) {
    localStorage.setItem('userId', JSON.stringify(user));
  }

  getCurrentUser() {
    return localStorage.getItem('userId');
  }

  loginUser(loginObj: LoginObject) {
    if (loginObj.username !== '' && loginObj.password !== '') {
      return this.http.post(`${this.baseUrl}/login/checkUser`, {
        ...loginObj,
      });
    }
  }

  registerUser(registerObj: RegisterObject) {
    return this.http.post(`${this.baseUrl}/register/registerUser`, {
      ...registerObj,
    });
  }

  logout() {
    if (confirm('Are you sure you want to logout?')) {
      this.setIsLoggedIn(false);
      this.setCurrentUser('noUser');
      this.router.navigate(['login']);
    }
  }
}

interface LoginObject {
  username: string;
  password: string;
}

interface RegisterObject {
  username: string;
  password: string;
  repassword: string;
  name: string;
  email: string;
}
