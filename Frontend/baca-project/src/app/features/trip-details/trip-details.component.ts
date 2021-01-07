import { TripDetails } from 'src/app/core/models/TripDetails';
import { TripService } from './../../core/services/trip.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss'],
})
export class TripDetailsComponent implements OnInit {
  tripId;
  tripDetails: TripDetails;
  lat: number ;
  lng : number ;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly tripService: TripService,
    private readonly mapsAPILOader: MapsAPILoader
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((param) => {
      this.tripId = param.tripId;
    });
    this.tripService.getTripDetails(Number(this.tripId)).subscribe(resp => {
      this.tripDetails = resp.response;
      console.log(this.tripDetails);
    });
    this.mapsAPILOader.load().then(() => {
      this.getCurrentLocation();
    });
  }

  getCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }

}
