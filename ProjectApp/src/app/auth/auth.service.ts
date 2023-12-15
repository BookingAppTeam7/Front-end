import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {AuthResponse} from "./model/auth-resposne.model";
import {JwtHelperService} from "@auth0/angular-jwt";
import { environment } from 'src/env/env';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });

  user$ = new BehaviorSubject("");
  userState = this.user$.asObservable();

  constructor(private http: HttpClient) {
    this.user$.next(this.getRole());
  }

  login(auth: any): Observable<AuthResponse> {
    console.log("LOGG IN")
    return this.http.post<AuthResponse>(environment.apiHost + 'login', auth, {
      headers: this.headers,
    });
  }

  logout(): void {
     this.http.get(environment.apiHost + 'logOut', {

      responseType: 'text',
    }).subscribe({
      next:()=>{
        localStorage.removeItem('user');
      }
    });
    localStorage.removeItem('user');
  }
  

  getRole(): any {
    if (this.isLoggedIn()) {
      const accessToken: any = localStorage.getItem('user');
      const helper = new JwtHelperService();
      return helper.decodeToken(accessToken).authority;
    }
    return null;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') != null;
  }

  setUser(): void {
    this.user$.next(this.getRole());
  }

  
}
