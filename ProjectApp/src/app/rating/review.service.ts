import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import { environment } from 'src/env/env';
import {Observable} from "rxjs";

import { ReviewPutDTO } from '../models/dtos/reviewPutDTO.model';
import { ReviewPostDTO } from '../models/dtos/reviewPostDTO.model';
import { Review } from '../accommodation/accommodation/model/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviewsList: Review[] = [];

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Review[]> {
    return this.httpClient.get<Review[]>(environment.apiHost + 'reviews')
  }

  create(review: ReviewPostDTO): Observable<ReviewPostDTO> {

    return this.httpClient.post<ReviewPostDTO>(environment.apiHost + 'reviews', review)
  }
  update(review: ReviewPutDTO,id:number): Observable<Review> {
    console.log("POZVAO : ")
    console.log(review)
    console.log(id)
    console.log(environment.apiHost + 'reviews/' + id)
    return this.httpClient.put<Review>(environment.apiHost + 'reviews/' + id,review)
  }

  findByOwnerId(ownerId: string): Observable<Review[]> {
    return this.httpClient.get<Review[]>(environment.apiHost + 'reviews/owner/' + ownerId);
  }

  findByAccommodationId(accommodationId: number): Observable<Review[]> {
    return this.httpClient.get<Review[]>(environment.apiHost + 'reviews/accommodation/' + accommodationId);
  }
  delete(id:number) {
    return this.httpClient.delete(environment.apiHost + 'reviews/' + id)
  }


  
  
}