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
import { TripsListComponent } from './trips-list/trips-list.component';
import { TripCardComponent } from './trip-card/trip-card.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [LoginComponent, HomepageComponent, RegisterComponent, TripsListComponent, TripCardComponent, AddTripComponent, TripDetailsComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    ToastrModule.forRoot(),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyB31v0iK4rSPiZ9Q6utyM3hwP0Gc2mbIOM'})
  ],
  entryComponents: [LoginComponent, HomepageComponent],
  providers: [{ provide: ToastrService, useClass: ToastrService }],
})
export class FeaturesModule {}
