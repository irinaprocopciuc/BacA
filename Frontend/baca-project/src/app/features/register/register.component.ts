import { ErrorHandlingService } from './../../core/services/error-handling.service';
import { LoginRegisterService } from './../../core/services/login-register.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly registerService: LoginRegisterService,
    private readonly errorService: ErrorHandlingService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: [null, Validators.required],
      username: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      repassword: [null, Validators.required],
    });
  }

  register(info): void {
    this.registerService.registerUser(info).subscribe(
      (res) => {
        if (res['code'] === '200') {
          this.errorService.displaySuccessToast(res['message'], '');
          this.router.navigate(['login']);
        }
      },
      (err) => {
        if (err.error.code === '401') {
          this.errorService.displayErrorToast(err.error.message, '');
        }
      }
    )
  }

  onReset(): void {
    this.registerForm.reset();
  }

  backToLogin(): void {
    this.router.navigate(['login']);
  }
}
