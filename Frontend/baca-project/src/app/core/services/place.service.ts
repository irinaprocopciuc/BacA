import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  private readonly baseUrlAirlabs: 'https://dev.allmyles.com/v2.0';

  constructor(private readonly http: HttpClient) {}

  getCityDetails(cityName): Observable<any> {
    return this.http.get(
      `https://dev.allmyles.com/v2.0/masterdata/search?keyword=${cityName}`
    );
  }

  getHotels(hotelDetails: HotelDetails) {
    let headers = new HttpHeaders({
      'X-Auth-Token': environment.allmylesAPIkey,
      'Content-Type': 'text/plain'
    });
    return this.http.post(
      '/v2.0/hotels',
      { ...hotelDetails },
      {  headers: headers },
    );
  }
}

interface HotelDetails {
  cityCode: string;
  rooms: RoomDetails[];
  arrivalDate: string;
  leaveDate: string;
  nationality: string;
}

interface RoomDetails {
  ADT: number;
}
