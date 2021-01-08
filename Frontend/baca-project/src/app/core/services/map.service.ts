import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private readonly http: HttpClient) {}

  getPlacesForName(searchTerm: string) {
    return this.http.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTerm}.json?access_token=${environment.mapAccessToken}`
    );
  }

  getCurrentLocationFromCoordinates(longitude, latitude) {
    return this.http.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${environment.mapAccessToken}`
    );
  }
}
