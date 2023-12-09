import { Injectable } from '@angular/core';
import { User } from './models/user.model';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/env/env';
import {Observable} from "rxjs";
import { UserPostDTO } from './models/userPostDTO.model';
import { UserGetDTO } from './models/userGetDTO.model';
import { UserPutDTO } from './models/userPutDTO.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersList: UserGetDTO[] = [];

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<UserGetDTO[]> {
    return this.httpClient.get<UserGetDTO[]>(environment.apiHost + 'users')
  }

  create(user: UserPostDTO): Observable<UserPostDTO> {

    return this.httpClient.post<UserPostDTO>(environment.apiHost + 'users', user)
  }
  update(user: UserPutDTO,username:string): Observable<User> {
    return this.httpClient.put<User>(environment.apiHost + 'users/' + username,user)
  }

  deleteUser(username:string) {
    return this.httpClient.delete(environment.apiHost + 'users/' + username)
  }

  getById(username: string): Observable<UserGetDTO> {
    return this.httpClient.get<UserGetDTO>(environment.apiHost + 'users/username/' + username)
  }
  getByToken(token: string): Observable<User>{
    return this.httpClient.get<User>(environment.apiHost+'users/token/'+token)
  }
}