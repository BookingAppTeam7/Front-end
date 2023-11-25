import { Component } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule,MatIconModule,MatButtonModule,MatSelectModule],
})
export class RegisterFormComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  name = new FormControl('', [Validators.required, Validators.requiredTrue]);
  password = new FormControl('', [Validators.required, Validators.requiredTrue]);
  surname = new FormControl('', [Validators.required, Validators.requiredTrue]);
  hide = true;
  constructor(private router: Router) { }
  navigateToHome() {
    // ...
    this.router.navigate(['home']);
  }
  getErrorMailMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  getErrorEmptyMessage() {
    if (this.name.hasError('required')|| this.password.hasError('required')|| this.surname.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }
}

