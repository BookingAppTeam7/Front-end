import { Component } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/user.service';
import { UserPostDTO } from 'src/app/models/userPostDTO.model';
import { RoleEnum } from 'src/app/models/userEnums.model';
import {MatSlideToggleChange, MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatOptionSelectionChange, ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule,MatIconModule,MatButtonModule,MatSelectModule,
  MatSlideToggleModule],
})
export class RegisterFormComponent {

  color: ThemePalette = 'primary';
  disabled=false;
  checked=false;
  reservationRequestNotification:boolean=false;
  reservationCancellationNotification:boolean=false;
  ownerRatingNotification:boolean=false;
  accommodationRatingNotification:boolean=false;
  ownerRepliedToRequestNotification:boolean=false;

  createRegisterForm=new FormGroup({
    name: new FormControl(),
    surname:new FormControl(),
    phoneNumber: new FormControl(),
    address: new FormControl(),
    username: new FormControl(),
    password:new FormControl(),
    confirmPassword:new FormControl(),
    role:new FormControl(),
    requestNotification:new FormControl(),
    cancellationNotification:new FormControl(),
    accommodationRatingNotification:new FormControl(),
    ownerRatingNotification:new FormControl(),
    ownerRepliedNotification:new FormControl(),
   

  })
  hide = true;
  constructor(private userService:UserService,private router: Router) {
    this.createRegisterForm.get('requestNotification')?.disable();
    this.createRegisterForm.get('cancellationNotification')?.disable();
    this.createRegisterForm.get('ownerRatingNotification')?.disable();
    this.createRegisterForm.get('accommodationRatingNotification')?.disable();
    this.createRegisterForm.get('ownerRepliedNotification')?.disable();
   }
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
    
    
    const userRoleValue: string | undefined= this.createRegisterForm.get('role')?.value;
    console.log(userRoleValue);
    if(userRoleValue!==undefined){
    
      const userRoleEnum: RoleEnum = RoleEnum[userRoleValue as keyof typeof RoleEnum];
      const user: UserPostDTO = {
        firstName: this.createRegisterForm.value.name,
        lastName:this.createRegisterForm.value.surname,
        phoneNumber: this.createRegisterForm.value.phoneNumber,
        address: this.createRegisterForm.value.address,
        username:this.createRegisterForm.value.username,
        password:this.createRegisterForm.value.password,
        passwordConfirmation:this.createRegisterForm.value.confirmPassword,
        role: userRoleEnum,
        reservationRequestNotification:this.reservationRequestNotification,
        reservationCancellationNotification:this.reservationCancellationNotification,
        ownerRatingNotification:this.ownerRatingNotification,
        accommodationRatingNotification:this.accommodationRatingNotification,
        ownerRepliedToRequestNotification:this.ownerRepliedToRequestNotification,
        deleted:false

      }
      
      this.userService.create(user).subscribe(
        {

          next: (data: UserPostDTO) => {
            this.router.navigate(['users-view'])
          },

        }
        
      );
      
    }

    }
    onSlideToggleChangeRequestNotification(event: MatSlideToggleChange) {
      const reservationRequestNotificationChecked = event.checked;
      this.reservationRequestNotification=reservationRequestNotificationChecked.valueOf();

    }
    onSlideToggleChangeCancellationNotification(event: MatSlideToggleChange){
      const reservationRequestNotificationChecked = event.checked;
      this.reservationRequestNotification=reservationRequestNotificationChecked.valueOf();
    }
    onSlideToggleChangeOwnerRatingNotification(event:MatSlideToggleChange){
      const ownerRatingNotification = event.checked;
      this.ownerRatingNotification=ownerRatingNotification.valueOf();
    }
    onSlideToggleChangeAccommodationRatingNotification(event:MatSlideToggleChange){
      const accommodationRatingNotification = event.checked;
      this.accommodationRatingNotification=accommodationRatingNotification.valueOf();
    }
    onSlideToggleChangeOwnerRepliedRequestNotification(event:MatSlideToggleChange){
      const ownerRepliedToRequestNotification = event.checked;
      this.ownerRepliedToRequestNotification=ownerRepliedToRequestNotification.valueOf();

    }
    onRoleSelectionChange(event:MatSelectChange){
      const selectedRole = event.source.value;
      console.log('Promenjena uloga:', selectedRole);
  
      // Ovde možete dodati dodatnu logiku u zavisnosti od izabrane uloge
      if (selectedRole === 'ADMIN') {
        this.createRegisterForm.get('requestNotification')?.disable();
        this.createRegisterForm.get('cancellationNotification')?.disable();
        this.createRegisterForm.get('ownerRatingNotification')?.disable();
        this.createRegisterForm.get('accommodationRatingNotification')?.disable();
        this.createRegisterForm.get('ownerRepliedNotification')?.disable();
      } else if (selectedRole === 'GUEST') {
        this.createRegisterForm.get('requestNotification')?.disable();
        this.createRegisterForm.get('cancellationNotification')?.disable();
        this.createRegisterForm.get('ownerRatingNotification')?.disable();
        this.createRegisterForm.get('accommodationRatingNotification')?.disable();
        this.createRegisterForm.get('ownerRepliedNotification')?.enable();
      } else if (selectedRole === 'OWNER') {
        this.createRegisterForm.get('requestNotification')?.enable();
        this.createRegisterForm.get('cancellationNotification')?.enable();
        this.createRegisterForm.get('ownerRatingNotification')?.enable();
        this.createRegisterForm.get('accommodationRatingNotification')?.enable();
        this.createRegisterForm.get('ownerRepliedNotification')?.disable();
      }
    }

    }
  

   


  
