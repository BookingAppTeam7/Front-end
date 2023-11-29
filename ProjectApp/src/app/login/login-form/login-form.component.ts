import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  standalone:true,
  imports:[MatFormFieldModule, MatInputModule, MatIconModule,MatButtonModule,MatIconModule],
})

export class LoginFormComponent {
  hide=true;
  @ViewChild('usernameInput') usernameInput!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;

  
  constructor(private router: Router) { }
  navigateToHome() {

    const username = this.usernameInput.nativeElement.value;
    const password = this.passwordInput.nativeElement.value;

    console.log('Username:', username);
    console.log('Password:', password);
    // ...
    this.router.navigate(['home']);

    
  }

  register(){
    this.router.navigate(['register'])
  }
}
