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
  isLoggedIn: boolean;

  constructor(
    public readonly loginService: LoginRegisterService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.loginService.getIsLoggedIn().subscribe(value => {
        this.isLoggedIn = value;
      })
    }, 500);
  }

  logout(): void {
    this.loginService.logout();
    this.isLoggedIn = false;
  }

  login(): void {
    this.router.navigate(['login']);
  }

  navigateToTripList(): void {
    this.router.navigate(['tripsList'])
  }

  navigateToAddForm(): void {
    this.router.navigate(['addTrip']);
  }
}
