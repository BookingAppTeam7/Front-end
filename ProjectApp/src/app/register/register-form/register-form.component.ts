import { Component } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/user.service';
import { UserPostDTO } from 'src/app/models/userPostDTO.model';
import { RoleEnum } from 'src/app/models/userEnums.model';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule,MatIconModule,MatButtonModule,MatSelectModule],
})
export class RegisterFormComponent {
  // email = new FormControl('', [Validators.required, Validators.email]);
  // name = new FormControl('', [Validators.required, Validators.requiredTrue]);
  // password = new FormControl('', [Validators.required, Validators.requiredTrue]);
  // surname = new FormControl('', [Validators.required, Validators.requiredTrue]);

  createRegisterForm=new FormGroup({
    name: new FormControl(),
    surname:new FormControl(),
    phoneNumber: new FormControl(),
    address: new FormControl(),
    email: new FormControl(),
    password:new FormControl(),
    role:new FormControl()
  })
  hide = true;
  constructor(private userService:UserService,private router: Router) { }
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  navigateToHome() {
    this.router.navigate(['home']);
    
  }
  register(){
    
    console.log("KLIK NA DUGME")
    const userRoleValue: string | undefined= this.createRegisterForm.get('role')?.value;
    console.log(userRoleValue);
    if(userRoleValue!==undefined){
      console.log("USAO U IF")
      const userRoleEnum: RoleEnum = RoleEnum[userRoleValue as keyof typeof RoleEnum];
      const user: UserPostDTO = {
        firstName: this.createRegisterForm.value.name,
        lastName:this.createRegisterForm.value.surname,
        phoneNumber: this.createRegisterForm.value.phoneNumber,
        address: this.createRegisterForm.value.address,
        username:this.createRegisterForm.value.email,
        password:this.createRegisterForm.value.password,
        role: userRoleEnum,
       
      }
      
      this.userService.create(user).subscribe(
        {
        
      
          next: (data: UserPostDTO) => {
            console.log("isap u subscribeeeeee");
            this.router.navigate(['users-view'])
          },
        
         
        }
        
      );
      
    }
    
   
      
    }

   
  }

  
