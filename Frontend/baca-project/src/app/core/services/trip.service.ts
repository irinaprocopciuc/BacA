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
}
