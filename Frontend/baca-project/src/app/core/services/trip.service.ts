import { TripDetails } from 'src/app/core/models/TripDetails';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TripService {
  private readonly baseUrl = environment.url;
  constructor(private readonly http: HttpClient) { }

  getTripList(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/trip/getTrips/userID=${userId}`);
  }

  addNewTrip(tripDetails: TripDetails) {
    return this.http.post(`${this.baseUrl}/trip/addTrip`, {
      ...tripDetails
    });
  }

  deleteTrip(tripId: number) {
    return this.http.delete(`${this.baseUrl}/trip/deleteTrip/tripId=${tripId}`);
  }

  getTripDetails(tripId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/trip/getTrip/tripID=${tripId}`);
  }
  getTripLocationEmergencyData(countryCode:string){
    return this.http.get(`/api/country/${countryCode}`);
  }
}
