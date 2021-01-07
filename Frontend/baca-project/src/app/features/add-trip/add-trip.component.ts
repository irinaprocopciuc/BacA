import { Router } from '@angular/router';
import { ErrorHandlingService } from './../../core/services/error-handling.service';
import { LoginRegisterService } from './../../core/services/login-register.service';
import { TripDetails } from 'src/app/core/models/TripDetails';
import { TripService } from './../../core/services/trip.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import {
  AppDateAdapter,
  APP_DATE_FORMATS,
} from 'src/app/core/adapters/date.adapter';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.scss'],
  providers: [
    DatePipe,
    {
      provide: DateAdapter,
      useClass: AppDateAdapter,
    },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ],
})
export class AddTripComponent implements OnInit {
  addForm: FormGroup;
  currentUser;

  constructor(
    private readonly fb: FormBuilder,
    private readonly tripService: TripService,
    private readonly loginService: LoginRegisterService,
    private readonly datePipe: DatePipe,
    private readonly errorService: ErrorHandlingService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.addForm = this.fb.group({
      tripName: [null, Validators.required],
      destination: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
    });
    this.currentUser = this.loginService.getCurrentUser();
  }

  addNewTrip(trip: TripDetails) {
    trip.userId = this.currentUser;
    trip.startDate = this.datePipe.transform(
      new Date(trip.startDate),
      'yyyy-MM-dd'
    );
    trip.endDate = this.datePipe.transform(
      new Date(trip.endDate),
      'yyyy-MM-dd'
    );
    console.log(trip);
    this.tripService.addNewTrip(trip).subscribe(
      (res) => {
        if (res['code'] === '200') {
          this.errorService.displaySuccessToast(res['message'], '');
          this.router.navigate(['tripsList']);
        }
      },
      (err) => {
        if (err.error.code === '401') {
          this.errorService.displayErrorToast(err.error.message, '');
        }
      }
    );
  }

  onReset(): void {
    this.addForm.reset();
  }
}
