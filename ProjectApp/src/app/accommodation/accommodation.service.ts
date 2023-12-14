import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/env/env';
import {Observable} from "rxjs";
import { AccommodationPostDTO } from '../models/dtos/accommodationPostDTO.model';
import { AccommodationPutDTO } from '../models/dtos/accommodationPutDTO.model';
import { Accommodation } from './accommodation/model/accommodation.model';
import { HttpHeaders } from '@angular/common/http';
import { AccommodationStatusEnum } from '../models/enums/accommodationStatusEnum';
import { HttpParams } from '@angular/common/http';
import { AccommodationDetails } from './accommodation/model/accommodationDetails.model';
import { formatDate } from '@angular/common';
import { AccommodationTypeEnum } from '../models/enums/accommodationTypeEnum';

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
  getAll():Observable<Accommodation[]>{
    return this.httpClient.get<Accommodation[]>(environment.apiHost+'accommodations');
  }
  getById(id: number): Observable<Accommodation | undefined> {
    return this.httpClient.get<Accommodation>(environment.apiHost + 'accommodations/' + id);
  }
  search(city: string, guests: number, startDate: Date, endDate:Date):Observable<AccommodationDetails[]>{
    const params = new HttpParams()
    .set('city', city)
    .set('guests', guests.toString())
    .set('arrival', formatDate(startDate, 'yyyy-MM-dd', 'en-US'))
    .set('checkout', formatDate(endDate, 'yyyy-MM-dd', 'en-US'));
    console.log(params);
    return this.httpClient.get<AccommodationDetails[]>(environment.apiHost+'accommodations/search',{params});
  }
  filter(accommodations: string, assets: string[], type: AccommodationTypeEnum, minPrice: number, maxPrice: number): Observable<AccommodationDetails[]> {
    const assetsString = assets.join(',');
  
    const params = new HttpParams()
      .set('searched', accommodations)
      .set('assets', assetsString)
      .set('type', type.toString())
      .set('minTotalPrice', minPrice.toString())
      .set('maxTotalPrice', maxPrice.toString());
  
    return this.httpClient.get<AccommodationDetails[]>(environment.apiHost + 'accommodations/filter', { params });
  }
  getByStatus(status: AccommodationStatusEnum): Observable<Accommodation[] | undefined> {
    return this.httpClient.get<Accommodation[]>(environment.apiHost + 'accommodations/status/' + status);
  }

  update(updatedAccommodation: AccommodationPutDTO, id: number): Observable<AccommodationPutDTO> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put<AccommodationPutDTO>(
      environment.apiHost + 'accommodations/' + id,
      JSON.stringify(updatedAccommodation),
      { headers: headers }
    );
  }
  
  updateStatus(id: number, status: AccommodationStatusEnum): Observable<Accommodation> {
    const params = new HttpParams().set('status', status);
    const apiUrl = `${environment.apiHost}accommodations/${id}/update-status`;0
    return this.httpClient.put<Accommodation>(apiUrl, null, { params });
  }

  delete(id: number): Observable<Accommodation | undefined> {
    return this.httpClient.delete<Accommodation>(environment.apiHost + 'accommodations/' + id);
  }

}


