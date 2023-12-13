import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Login } from 'src/app/auth/model/login.model';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthResponse } from 'src/app/auth/model/auth-resposne.model';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  standalone:true,
  imports:[MatFormFieldModule, MatInputModule, MatIconModule,MatButtonModule,MatIconModule,ReactiveFormsModule],
})

export class LoginFormComponent {

  constructor(private authService: AuthService,
    private router: Router) {

}
  hide=true;
  @ViewChild('usernameInput') usernameInput!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;

  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  })
  
  navigateToHome() {

    const username = this.usernameInput.nativeElement.value;
    const password = this.passwordInput.nativeElement.value;

    console.log('Username:', username);
    console.log('Password:', password);
    // ...
    this.router.navigate(['home']);

    
  }

  login(): void {
    console.log("USAOOOO LOGGGG VESNA")
    if(this.loginForm.valid) {
      const login: Login = {
        username: this.loginForm.value.username || "",
        password: this.loginForm.value.password || ""
      }
      console.log("USAOOOO LOGGGG VESNICCAAAAAAA 57")
      this.authService.login(login).subscribe({
        next: (response: AuthResponse) => {
          console.log("TOKEEEEN : ",response.token)
          localStorage.setItem('user', response.token);
          this.authService.setUser()
          this.router.navigate(['home'])
        }
      })
    }
  }


  register(){
    this.router.navigate(['register'])
  }
}
