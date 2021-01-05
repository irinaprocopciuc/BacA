import { AppRoutingModule } from './../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@NgModule({
  declarations: [LoginComponent, HomepageComponent, RegisterComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ToastrModule.forRoot(),
  ],
  entryComponents: [LoginComponent, HomepageComponent],
  providers: [{ provide: ToastrService, useClass: ToastrService }],
})
export class FeaturesModule {}
