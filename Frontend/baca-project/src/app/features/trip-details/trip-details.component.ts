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
  currentCountry: string;
  emergencyNumber: string;
  currentLocation;
  map;
  geocoder;
  mapboxClient;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly tripService: TripService,
    private readonly mapService: MapService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((param) => {
      this.tripId = param.tripId;
    });
    this.getCurrentLocation();
    this.tripService.getTripDetails(Number(this.tripId)).subscribe((resp) => {
      this.tripDetails = resp.response;

      this.mapService
        .getPlacesForName(this.tripDetails?.destination.toString())
        .subscribe((placesList) => {
          this.getDestinationLocation(placesList['features'][0]);
        });
    });
    /*TODO TEST DATA START - TO BE REMOVED*/
    this.emergencyNumber = '000';
    this.currentCountry = "US";
    /*TEST DATA END - TO BE REMOVED */
    this.getCurrentLocationEmergencyNumber();
  }

  getDestinationLocation(locationName): void {
    let destinationLng = locationName.center['0'];
    let destinationLat = locationName.center['1'];
    this.map = new mapboxgl.Map({
      accessToken: environment.mapAccessToken,
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [destinationLng, destinationLat],
      zoom: 9,
    });

    this.geocoder = new MapboxGeocoder({
      accessToken: environment.mapAccessToken,
      marker: {
        color: 'orange',
      },
      mapboxgl: mapboxgl,
    });

    this.map.addControl(this.geocoder);
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





  //**EMERGENCY NUMBER EXTRACTION FROM EMERGENCY API BETA - BEGINNING*/

  getCountryCodeFromJSON(locationName): void{
    let destinationCode;
    let short_name = null;
    let i=0;
    //TODO REMOVE THE CLOGS
    //console.log("Destination Code :"+ JSON.stringify(destinationCode));
    while(short_name == null){
      destinationCode = locationName.context[i];
      //TODO REMOVE THE CLOGS
      //console.log("SCTEST: " +JSON.stringify(destinationCode));
      //console.log("SCTEST: " +JSON.stringify(destinationCode.short_code));
      if(destinationCode.short_code !== 'undefined')
        short_name = destinationCode.short_code;
      i++;
    }
    //TODO REMOVE THE CLOGS
    //console.log("Short Country Name :"+short_name.trim().substring(0, 2));
    return short_name.trim().substring(0, 2);


  }
  getCurrentLocationCountryCode(): string{
    //console.log("Trip destination:"+ this.tripDetails?.destination.toString());
    this.mapService
        .getPlacesForName(this.tripDetails?.destination.toString())
        .subscribe((placesList) => {
           //TODO REMOVE THE CLOGS
            //console.log(placesList['features'][0]);
            //console.log("Current country code after edit: "+ this.currentCountry);
          return this.getCountryCodeFromJSON(placesList['features'][0]).toString();
        });
  }
  getEmergencyNumberFromData(emergencyData): string{
    //TODO REMOVE THE CLOGS
    console.log(JSON.stringify(emergencyData));
    let datanumber = emergencyData['data'];
    //TODO REMOVE THE CLOGS
    //console.log(JSON.stringify(datanumber));
    let isMember112 = datanumber['member_112'];
    if(isMember112 == true)
      return '112';
    else{
      let emergencyDispatchNumber = datanumber['dispatch']['all'];
        return emergencyDispatchNumber;
    }
    return '000';
  }

  getCurrentLocationEmergencyNumber(): void{
    this.getCurrentLocationCountryCode();
    this.tripService.getTripLocationEmergencyData(this.currentCountry).subscribe((resp)=>{
      this.emergencyNumber = this.getEmergencyNumberFromData(resp);
      //TODO REMOVE THE CLOGS
      //console.log(JSON.stringify(resp));
      //console.log("Emergency Number: "+this.emergencyNumber);
    });
  }

  //**EMERGENCY NUMBER EXTRACTION FROM EMERGENCY API BETA - END*/
}
