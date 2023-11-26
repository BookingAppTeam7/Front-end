import { Component } from '@angular/core';
import { Accommodation } from '../accommodation/model/accommodation.model';
import { AccommodationService } from '../accommodation.service';

@Component({
  selector: 'app-accommodation-cards',
  templateUrl: './accommodation-cards.component.html',
  styleUrls: ['./accommodation-cards.component.css']
})
export class AccommodationCardsComponent {
  accommodationList: Accommodation[] = [{
    id: 1,
    name: 'Cozy Cottage',
    description: 'A charming cottage near the countryside.',
    location: 'Rural Retreat, USA',
    minGuests: 2,
    maxGuests: 4,
    status: 'Available'
  },
  {
    id: 2,
    name: 'Luxury Beachfront Villa',
    description: 'An elegant villa with stunning ocean views.',
    location: 'Tropical Paradise, Maldives',
    minGuests: 6,
    maxGuests: 10,
    status: 'Booked'
  },
  {
    id: 3,
    name: 'Mountain Retreat Cabin',
    description: 'A cozy cabin nestled in the mountains.',
    location: 'Serenity Peaks, Canada',
    minGuests: 2,
    maxGuests: 6,
    status: 'Available'
  },
  {
    id: 4,
    name: 'Urban City Loft',
    description: 'A modern loft in the heart of the city.',
    location: 'Metropolis City, USA',
    minGuests: 1,
    maxGuests: 3,
    status: 'Available'
  },
  {
    id: 5,
    name: 'Historic Bed and Breakfast',
    description: 'A historic B&B with period charm.',
    location: 'Old Town, United Kingdom',
    minGuests: 2,
    maxGuests: 8,
    status: 'Available'
  }];
  //clickedWine: string = ''

  constructor(private service: AccommodationService) {
  }

  ngOnInit(): void {
    // this.service.getAll().subscribe({
    //   next: (data: Accommodation[]) => {
    //     this.accommodationList = data
    //   },
    //   error: (_) => {console.log("Greska!")}
    // })
  }
}
