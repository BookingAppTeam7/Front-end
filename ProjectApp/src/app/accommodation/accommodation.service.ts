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
  private accommodationList: Accommodation[] = [{
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

  constructor(private httpClient: HttpClient) {
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