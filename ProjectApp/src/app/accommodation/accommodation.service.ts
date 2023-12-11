import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/env/env';
import {Observable} from "rxjs";
import { AccommodationPostDTO } from '../models/dtos/accommodationPostDTO.model';
import { AccommodationPutDTO } from '../models/dtos/accommodationPutDTO.model';
import { Accommodation } from './accommodation/model/accommodation.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {
  constructor(private httpClient: HttpClient) {
  }

  create(accommodation: AccommodationPostDTO): Observable<Accommodation> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<Accommodation>(
      environment.apiHost + 'accommodations',
      JSON.stringify(accommodation),
      { headers: headers }
    );
  }

  getById(id: number): Observable<Accommodation | undefined> {
    return this.httpClient.get<Accommodation>(environment.apiHost + 'accommodations/' + id);
  }

  update(updatedAccommodation: AccommodationPutDTO, id: number): Observable<AccommodationPutDTO> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put<AccommodationPutDTO>(
      environment.apiHost + 'accommodations/' + id,
      JSON.stringify(updatedAccommodation),
      { headers: headers }
    );
  }

  delete(id: number): Observable<Accommodation | undefined> {
    return this.httpClient.delete<Accommodation>(environment.apiHost + 'accommodations/' + id);
  }

}


