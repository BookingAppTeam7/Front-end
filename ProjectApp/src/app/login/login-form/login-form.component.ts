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
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  standalone:true,
  imports:[MatFormFieldModule, MatInputModule, MatIconModule,MatButtonModule,MatIconModule,ReactiveFormsModule,
  MatSnackBarModule]
  
})

export class LoginFormComponent {

  constructor(private authService: AuthService,
    private router: Router,private snackBar: MatSnackBar) {}

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
          console.log("TOKEEEEN : ",response.jwt)
          localStorage.setItem('user', response.jwt);
          this.authService.setUser()
          this.router.navigate(['home'])
        },
        error:(error)=>{

          console.error('Failed to login ',error);
          this.snackBar.open('Failed login. Please check the username and password', 'Close', {
            duration: 5000, // Trajanje poruke u milisekundama
          });
        }
      })
    }
  }


  register(){
    this.router.navigate(['register'])
  }
}
