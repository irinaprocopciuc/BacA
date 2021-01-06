import { Component, Input, OnInit } from '@angular/core';
import { TripDetails } from 'src/app/core/models/TripDetails';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.scss']
})
export class TripCardComponent implements OnInit {
  @Input() tripDetails: TripDetails;
  constructor() { }

  ngOnInit(): void {
  }

}
