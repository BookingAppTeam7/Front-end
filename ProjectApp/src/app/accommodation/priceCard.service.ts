import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/env/env';
import {Observable} from "rxjs";
import { HttpHeaders } from '@angular/common/http';
import { PriceCard } from './accommodation/model/priceCard.model';

@Injectable({
  providedIn: 'root'
})
export class PriceCardService {
  constructor(private httpClient: HttpClient) {
  }

  create(priceCard: PriceCard): Observable<PriceCard> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<PriceCard>(
      environment.apiHost + 'priceCards',
      JSON.stringify(priceCard),
      { headers: headers }
    );
  }

  getByAccommodationId(id: number): Observable<PriceCard[] | undefined> {
    return this.httpClient.get<PriceCard[]>(environment.apiHost + 'priceCards/accommodation/' + id);
  }

  update(priceCard:PriceCard):Observable<PriceCard>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put<PriceCard>(
      environment.apiHost + 'priceCards',
      JSON.stringify(priceCard),
      { headers: headers }
    );
  }

  delete(id: number): Observable<void> {
    console.log(id)
    return this.httpClient.delete<void>(environment.apiHost+'priceCards/'+id);
  }



}