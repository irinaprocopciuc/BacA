import { ErrorHandlingService } from './../../core/services/error-handling.service';
import { ToastrService } from 'ngx-toastr';
import { LoginRegisterService } from './../../core/services/login-register.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly loginService: LoginRegisterService,
    private readonly errorService: ErrorHandlingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  login(): void {
    this.loginService.loginUser(this.loginForm.getRawValue()).subscribe(
      (resp) => {
        if (resp['code'] === '200') {
          this.errorService.displaySuccessToast(resp['message'], '');
          this.router.navigate(['homepage']);
        }
      },
      (err) => {
        if (err.error.code === '401') {
          this.errorService.displayErrorToast(err.error.message, '');
          this.loginService.setIsLoggedIn(false);
        }
      }
    );
  }
}
