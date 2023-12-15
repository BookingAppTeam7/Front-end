import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/env/env';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(private authService: AuthService) {}

  logout(): void {
    console.log("LOG OUT ")
    this.authService.logout();
  }
 }
 



