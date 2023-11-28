import { Injectable } from '@angular/core';
import {Accommodation} from "./accommodation/model/accommodation.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../env/env";
import {Observable} from "rxjs";
//added some comment
@Injectable({
  providedIn: 'root'
})
export class AccommodationService {
  accommodationList: Accommodation[] = [{
    id: 1,
    name: 'Cozy Cottage',
    description: 'A charming cottage near the countryside.',
    location: 'Rural Retreat, USA',
    minGuests: 2,
    maxGuests: 4,
    status: 'Available',
    image: '../../assets/images/accommodation1.jpg',
    price: 150.0,
    rating: 4.4
  },
  {
    id: 2,
    name: 'Luxury Beachfront Villa',
    description: 'An elegant villa with stunning ocean views.',
    location: 'Tropical Paradise, Maldives',
    minGuests: 6,
    maxGuests: 10,
    status: 'Booked',
    image: '../../assets/images/accommodation2.jpg',
    price: 200.0,
    rating: 3.9
  },
  {
    id: 3,
    name: 'Mountain Retreat Cabin',
    description: 'A cozy cabin nestled in the mountains.',
    location: 'Serenity Peaks, Canada',
    minGuests: 2,
    maxGuests: 6,
    status: 'Available',
    image: '../../assets/images/accommodation3.jpg',
    price: 175.0,
    rating: 3.3
  },
  {
    id: 4,
    name: 'Urban City Loft',
    description: 'A modern loft in the heart of the city.',
    location: 'Metropolis City, USA',
    minGuests: 1,
    maxGuests: 3,
    status: 'Available',
    image: '../../assets/images/accommodation4.jpg',
    price: 125.0,
    rating: 4.7
  },
  {
    id: 5,
    name: 'Historic Bed and Breakfast',
    description: 'A historic B&B with period charm.',
    location: 'Old Town, United Kingdom',
    minGuests: 2,
    maxGuests: 8,
    status: 'Available',
    image: '../../assets/images/accommodation5.jpg',
    price: 160.0,
    rating: 4.9
  },
  {
    id: 6,
    name: 'Historic Bed and Breakfast',
    description: 'A historic B&B with period charm.',
    location: 'Old Town, United Kingdom',
    minGuests: 2,
    maxGuests: 8,
    status: 'Available',
    image: '../../assets/images/accommodation5.jpg',
    price: 160.0,
    rating: 4.9
  },
  {
    id: 7,
    name: 'Urban City Loft',
    description: 'A modern loft in the heart of the city.',
    location: 'Metropolis City, USA',
    minGuests: 1,
    maxGuests: 3,
    status: 'Available',
    image: '../../assets/images/accommodation4.jpg',
    price: 125.0,
    rating: 4.7
  },
  {
    id: 8,
    name: 'Mountain Retreat Cabin',
    description: 'A cozy cabin nestled in the mountains.',
    location: 'Serenity Peaks, Canada',
    minGuests: 2,
    maxGuests: 6,
    status: 'Available',
    image: '../../assets/images/accommodation3.jpg',
    price: 175.0,
    rating: 3.3
  }
];

  constructor(private httpClient: HttpClient) {
  }
  getAccommodationById(id: number): Accommodation | undefined{
    return this.accommodationList.find(accommodation => accommodation.id === id);
  }
  getAll(): Observable<Accommodation[]> {
    return this.httpClient.get<Accommodation[]>(environment.apiHost + 'accommodations')
  }

  add(accommodation: Accommodation): Observable<Accommodation> {
    return this.httpClient.post<Accommodation>(environment.apiHost + 'add', accommodation)
  }

  getWine(id: number): Observable<Accommodation> {
    return this.httpClient.get<Accommodation>(environment.apiHost + 'accommodations/' + id)
  }
}