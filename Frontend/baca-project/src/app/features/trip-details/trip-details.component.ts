import { PlaceService } from './../../core/services/place.service';
import { MapService } from './../../core/services/map.service';
import { environment } from './../../../environments/environment';
import { TripDetails } from 'src/app/core/models/TripDetails';
import { TripService } from './../../core/services/trip.service';
import { Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { log } from 'console';
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
  startingPointLat: number;
  startingPointLng: number;
  startingLocationName: string;
  destinationLat: number;
  destinationLng: number;
  destinationName: string;
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

        // this.placeService.getHotels({
        //   cityCode: cityCode,
        //   rooms: [{ADT: 1}],
        //   arrivalDate: this.tripDetails.startDate,
        //   leaveDate: this.tripDetails.endDate,
        //   nationality: 'HU'
        // }).subscribe(res => {
        //   console.log(res);
        // })
      });
  }

  getTripDetails(): void {
    this.getCurrentLocation();
    this.tripService.getTripDetails(Number(this.tripId)).subscribe((resp) => {
      this.tripDetails = resp.response;

      this.mapService
        .getPlacesForName(this.tripDetails?.startingPoint.toString())
        .subscribe((placesList) => {
          this.getStartingPointLocation(placesList['features'][0]);
        });

      this.mapService
        .getPlacesForName(this.tripDetails?.destination.toString())
        .subscribe((placesList) => {
          this.getDestinationLocation(placesList['features'][0]);
        });

      this.getCityDetails();
    });
    /*TODO TEST DATA START - TO BE REMOVED*/
    this.emergencyNumber = '000';
    this.currentCountry = "US";
    //this.currentCountry = this.getCurrentLocationCountryCode();
    /*TEST DATA END - TO BE REMOVED */
    console.log("Destination test: "+this.tripDetails?.startingPoint());
    console.log(JSON.stringify(this.tripDetails?.destination))

    this.getCurrentLocationEmergencyNumber();
  }

  getStartingPointLocation(locationName): void {
    this.startingPointLat = locationName.center['1'];
    this.startingPointLng = locationName.center['0'];
    this.startingLocationName = locationName.place_name;
  }

  getDestinationLocation(locationName): void {
    this.destinationLng = locationName.center['0'];
    this.destinationLat = locationName.center['1'];
    this.destinationName = locationName.place_name;
    this.createMap();
  }

  createMap(): void {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapAccessToken,
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.destinationLng, this.destinationLat],
      zoom: 4,
    });

    this.geocoder = new MapboxGeocoder({
      accessToken: environment.mapAccessToken,
      marker: {
        color: 'green',
      },
      mapboxgl: mapboxgl,
    });

    this.map.addControl(this.geocoder);

    this.addDestinationMarker();
    this.addCurrentLocationMarker();
    this.addStartingPointMarker();
  }

  addDestinationMarker(): void {
    var popup1 = document.createElement('div');
    popup1.className = 'marker';

    var popupDestinationLocation = new mapboxgl.Popup().setHTML(
      'User <strong> destination </strong> is: ' + this.destinationName
    );

    var markerDestination = new mapboxgl.Marker(popup1)
      .setLngLat([this.destinationLng, this.destinationLat])
      .setPopup(popupDestinationLocation)
      .addTo(this.map);

    popup1.onmouseenter = () => markerDestination.togglePopup();
    popup1.onmouseleave = () => markerDestination.togglePopup();
  }

  addCurrentLocationMarker(): void {
    var popup2 = document.createElement('div');
    popup2.className = 'marker';

    var popupCurrentLocation = new mapboxgl.Popup().setHTML(
      'User  <strong>current</strong> location is: ' + this.currentLocation
    );

    var markerCurrentLocation = new mapboxgl.Marker(popup2)
      .setLngLat([this.currentLng, this.currentLat])
      .setPopup(popupCurrentLocation)
      .addTo(this.map);

    popup2.onmouseenter = () => markerCurrentLocation.togglePopup();
    popup2.onmouseleave = () => markerCurrentLocation.togglePopup();
  }

  addStartingPointMarker(): void {
    var popup3 = document.createElement('div');
    popup3.className = 'marker';

    var popupStartingPoint = new mapboxgl.Popup().setHTML(
      'User  <strong>starting point</strong> is: ' + this.startingLocationName
    );

    var markerStartingPoint = new mapboxgl.Marker(popup3)
      .setLngLat([this.startingPointLng, this.startingPointLat])
      .setPopup(popupStartingPoint)
      .addTo(this.map);

    popup3.onmouseenter = () => markerStartingPoint.togglePopup();
    popup3.onmouseleave = () => markerStartingPoint.togglePopup();
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

  getCurrentLocationEmergencyNumber(): void{
    // console.log("response: "+ this.getCurrentLocationCountryCode());
    // this.getCurrentLocationCountryCode().subscribe((resp)=>{
    //   console.log("restponse"+resp);
    // })
    this.getCurrentLocation();
    this.tripService.getTripDetails(Number(this.tripId)).subscribe((resp) => {
      this.tripDetails = resp.response;

      this.mapService
        .getPlacesForName(this.tripDetails?.destination)
        .subscribe((placesList) => {
           //TODO REMOVE THE CLOGS
            console.log(placesList['features'][0]);
            let code = this.getCountryCodeFromJSON(placesList['features'][0]);
            console.log("Something :" + code);
            this.currentCountry = code;
            //console.log("This is a separator");
      console.log("This is the corrent contry code :"+ this.currentCountry)
      this.tripService.getTripLocationEmergencyData(this.currentCountry).subscribe((resp)=>{
      this.emergencyNumber = this.getEmergencyNumberFromData(resp);
      //TODO REMOVE THE CLOGS
      //console.log(JSON.stringify(resp));
      //console.log("Emergency Number: "+this.emergencyNumber);
    });
            //console.log("Current country code after edit: "+ this.currentCountry);
            //return something.toString();
        });
    });
    
    
  }

  getCountryCodeFromJSON(locationName): string{
    let destinationCode;
    let short_name = null;
    let i=0;
    //TODO REMOVE THE CLOGS
    //console.log("Destination Code :"+ JSON.stringify(destinationCode));
    let tempShortNameFromProperties = locationName.properties;
    console.log("Prop location name"+JSON.stringify(tempShortNameFromProperties));
    if(tempShortNameFromProperties.short_code !=='undefind')
      short_name = tempShortNameFromProperties.short_code.toUpperCase();
      //console.log("Good short code prop : "+ short_name);
      else{
      while(short_name == null){
        destinationCode = locationName.context[i];
        //TODO REMOVE THE CLOGS
        console.log("SCTEST: " +JSON.stringify(destinationCode));
        //console.log("SCTEST: " +JSON.stringify(destinationCode.short_code));
        if(destinationCode.short_code !== 'undefined')
          short_name = destinationCode.short_code;
        i++;
      }
    }
    //TODO REMOVE THE CLOGS
    console.log("Short Country Name :"+short_name);
    return short_name.trim().substring(0, 2);


  }
  getCurrentLocationCountryCode() : void{
    //console.log("Trip destination:"+ this.tripDetails?.destination.toString());
    this.mapService
        .getPlacesForName(this.tripDetails?.destination.toString())
        .subscribe((placesList) => {
           //TODO REMOVE THE CLOGS
            console.log(placesList['features'][0]);
            var code = this.getCountryCodeFromJSON(placesList['features'][0]);
            console.log("Code :" + code);
            this.currentCountry = code;
            //console.log("Current country code after edit: "+ this.currentCountry);
            //return something.toString();
        });
  }
  getEmergencyNumberFromData(emergencyData): string{
    //TODO REMOVE THE CLOGS
    //console.log(JSON.stringify(emergencyData));
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

  

  //**EMERGENCY NUMBER EXTRACTION FROM EMERGENCY API BETA - END*/
}
