import { LoginRegisterService } from './../../core/services/login-register.service';
import { TripService } from './../../core/services/trip.service';
import { TripDetails } from './../../core/models/TripDetails';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.scss'],
})
export class TripsListComponent implements OnInit {
  trips: TripDetails[];
  currentUser;

  constructor(
    private readonly tripService: TripService,
    private readonly loginService: LoginRegisterService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.loginService.getCurrentUser();
    this.getTrips();
  }

  private getTrips(): void {
    this.tripService.getTripList(Number(this.currentUser)).subscribe((resp) => {
      this.trips = resp.response;
    });
  }
}
