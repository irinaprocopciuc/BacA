import { ErrorHandlingService } from './../../core/services/error-handling.service';
import { TripService } from './../../core/services/trip.service';
import { Component, Input, OnInit, Output } from '@angular/core';
import { TripDetails } from 'src/app/core/models/TripDetails';
import { EventEmitter } from '@angular/core';
import { Params, Router } from '@angular/router';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.scss'],
})
export class TripCardComponent implements OnInit {
  @Input() tripDetails: TripDetails;
  @Output() listUpdate = new EventEmitter();

  constructor(
    private readonly tripService: TripService,
    private readonly errorService: ErrorHandlingService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  deleteTrip(id): void {
    if (confirm('Are you sure you want to delete this trip?')) {
      this.tripService.deleteTrip(id).subscribe(
        (res) => {
          if (res['code'] === '200') {
            this.errorService.displaySuccessToast(res['message'], '');
          }
        },
        (err) => {
          if (err.error.code === '401') {
            this.errorService.displayErrorToast(err.error.message, '');
          }
        }
      );
      this.listUpdate.emit(id);
    }
  }

  showTripDetails(tripId): void {
    const queryParams: Params = { tripId: tripId };
    this.router.navigate(['tripDetails'], {
      queryParams: queryParams,
    });
  }
}
