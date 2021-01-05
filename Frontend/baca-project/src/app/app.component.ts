import { LoginRegisterService } from './core/services/login-register.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'baca-project';
  isLoggedIn$: Observable<boolean>;

  constructor(public readonly loginService: LoginRegisterService) {}

  ngOnInit() {
    this.isLoggedIn$ = this.loginService.isLoggedIn;
  }

  logout() {
    this.loginService.logout();
  }
}
