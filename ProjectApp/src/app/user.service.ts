import { Injectable } from '@angular/core';
import { User } from './models/user.model';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/env/env';
import {Observable} from "rxjs";
import { UserPostDTO } from './models/userPostDTO.model';
import { UserGetDTO } from './models/userGetDTO.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersList: UserGetDTO[] = [];

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<User[]> {
    console.log("USAO U SERVICE PA U GETALL");
    console.log("PUTANJA: " + environment.apiHost + 'users')
   
   
    // console.log(this.httpClient.get<UserGetDTO[]>(environment.apiHost + 'users'))
    return this.httpClient.get<UserGetDTO[]>(environment.apiHost + 'users')
  }

  create(user: UserPostDTO): Observable<UserPostDTO> {
    console.log("USAO U SERVICE PA U ADD");
    return this.httpClient.post<UserPostDTO>(environment.apiHost + 'users', user)
  }

  getWine(id: number): Observable<User> {
    return this.httpClient.get<User>(environment.apiHost + 'users/' + id)
  }
}