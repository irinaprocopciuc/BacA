import { PlaceService } from './../../core/services/place.service';
import { MapService } from './../../core/services/map.service';
import { environment } from './../../../environments/environment';
import { TripDetails } from 'src/app/core/models/TripDetails';
import { TripService } from './../../core/services/trip.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss'],
})
export class TripDetailsComponent implements OnInit {
  tripId;
  tripDetails: TripDetails;
  currentLat: number;
  currentLng: number;
  currentLocation;
  map;
  geocoder;
  mapboxClient;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly tripService: TripService,
    private readonly mapService: MapService,
    private readonly placeService: PlaceService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((param) => {
      this.tripId = param.tripId;
    });
    this.getTripDetails();
  }

  getCityDetails(): void {
    this.placeService
      .getCityDetails(this.tripDetails?.destination)
      .subscribe((list) => {
        let cityCode = list.locationSearchResult['0'].cityCode;
      });
  }

  getTripDetails(): void {
    this.getCurrentLocation();
    this.tripService.getTripDetails(Number(this.tripId)).subscribe((resp) => {
      this.tripDetails = resp.response;

      this.mapService
        .getPlacesForName(this.tripDetails?.destination.toString())
        .subscribe((placesList) => {
          this.getDestinationLocation(placesList['features'][0]);
        });

      this.getCityDetails();
    });
  }

  getDestinationLocation(locationName): void {
    let destinationLng = locationName.center['0'];
    let destinationLat = locationName.center['1'];
    this.map = new mapboxgl.Map({
      accessToken: environment.mapAccessToken,
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [destinationLng, destinationLat],
      zoom: 2,
    });

    this.geocoder = new MapboxGeocoder({
      accessToken: environment.mapAccessToken,
      marker: {
        color: 'orange',
      },
      mapboxgl: mapboxgl,
    });

    this.map.addControl(this.geocoder);

    new mapboxgl.Marker()
      .setLngLat([destinationLng, destinationLat])
      .addTo(this.map);

    new mapboxgl.Marker()
      .setLngLat([this.currentLng, this.currentLat])
      .addTo(this.map);

  }

  getCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLat = position.coords.latitude;
        this.currentLng = position.coords.longitude;

        this.mapService
          .getCurrentLocationFromCoordinates(this.currentLng, this.currentLat)
          .subscribe((resp) => {
            this.currentLocation = resp['features'][0].place_name;
          });
      });
    }
  }
}
