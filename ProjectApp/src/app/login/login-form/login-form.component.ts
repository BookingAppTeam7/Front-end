import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  standalone:true,
  imports:[MatFormFieldModule, MatInputModule, MatIconModule,MatButtonModule,MatIconModule],


})
export class LoginFormComponent {
  hide=true;
  constructor(private router: Router) { }
  navigateToHome() {
    // ...
    this.router.navigate(['home']);
  }
}
