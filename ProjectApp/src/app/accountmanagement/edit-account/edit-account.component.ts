import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { LayoutModule } from 'src/app/layout/layout.module';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup, AbstractControl, ValidationErrors} from '@angular/forms';
import { UserService } from 'src/app/user.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { RoleEnum, StatusEnum } from 'src/app/models/userEnums.model';
import { UserPutDTO } from 'src/app/models/userPutDTO.model';
import { User } from 'src/app/models/user.model';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import { UserGetDTO } from 'src/app/models/userGetDTO.model';
import {MatSlideToggleChange, MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ThemePalette } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule,MatInputModule, MatIconModule,MatButtonModule,
    MatSlideToggleModule,LayoutModule,FormsModule, ReactiveFormsModule,CommonModule],
})
export class EditAccountComponent implements OnInit { 
  user:UserGetDTO;
  color: ThemePalette = 'primary';
  disabled=true;
  checked=false;
  reservationRequestNotification:boolean=false;
  reservationCancellationNotification:boolean=false;
  ownerRatingNotification:boolean=false;
  accommodationRatingNotification:boolean=false;
  ownerRepliedToRequestNotification:boolean=false;

  editAccountDataForm=new FormGroup({
    name: new FormControl('', Validators.required),
    surname:new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
    address: new FormControl('', Validators.required),
    username: new FormControl('', [Validators.required, Validators.email]),
    password:new FormControl('', Validators.required),
    confirmPassword:new FormControl('', Validators.required),
    status:new FormControl(),
    role:new FormControl('', Validators.required),
    requestNotification:new FormControl(),
    cancellationNotification:new FormControl(),
    accommodationRatingNotification:new FormControl(),
    ownerRatingNotification:new FormControl(),
    ownerRepliedNotification:new FormControl(),
  },{ validators: this.passwordMatchValidator })
  hide=true;
  constructor(private route:ActivatedRoute,
    private userService:UserService,private router: Router) {
      this.editAccountDataForm.get('requestNotification')?.disable();
      this.editAccountDataForm.get('cancellationNotification')?.disable();
      this.editAccountDataForm.get('ownerRatingNotification')?.disable();
      this.editAccountDataForm.get('accommodationRatingNotification')?.disable();
      this.editAccountDataForm.get('ownerRepliedNotification')?.disable();
     }
//  email = new FormControl('', [Validators.required, Validators.email]);
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      const username = params['username'];

      this.userService.getById(username).subscribe(
        (user: UserGetDTO) => {
          this.user = user;
          this.editAccountDataForm.get('name')?.setValue(user.firstName);
          this.editAccountDataForm.get('surname')?.setValue(user.lastName);
          this.editAccountDataForm.get('username')?.setValue(user.username);
          // ... dodati za sve ostale labele
        },
        error => {
          console.error('Error fetching user:', error);
        }
      );
    });
  }



  saveChanges(){

  
        
    const userRoleValue: string | undefined= this.editAccountDataForm.get('role')?.value ?? undefined;
    const userStatusValue: string | undefined= this.editAccountDataForm.get('status')?.value;

    if(userRoleValue!==undefined && userStatusValue!==undefined){

      const userRoleEnum: RoleEnum = RoleEnum[userRoleValue as keyof typeof RoleEnum];
      const userStatusEnum: StatusEnum = StatusEnum[userStatusValue as keyof typeof StatusEnum];
      console.log("USERNAME--> ",this.editAccountDataForm.value.username )
      const changedUser: UserPutDTO = {
        firstName: this.editAccountDataForm.value.name ?? '',
        lastName:this.editAccountDataForm.value.surname ?? '',
        phoneNumber: this.editAccountDataForm.value.phoneNumber ?? '',
        address: this.editAccountDataForm.value.address ?? '',
        username:this.editAccountDataForm.value.username ?? '',
        password:this.editAccountDataForm.value.password ?? '',
        passwordConfirmation:this.editAccountDataForm.value.confirmPassword ?? '',
        status:userStatusEnum,
        role: userRoleEnum,
        reservationRequestNotification:this.reservationRequestNotification,
        reservationCancellationNotification:this.reservationCancellationNotification,
        ownerRatingNotification:this.ownerRatingNotification,
        accommodationRatingNotification:this.accommodationRatingNotification,
        ownerRepliedToRequestNotification:this.ownerRepliedToRequestNotification,
        deleted:false,
        token:'',
      }

      this.userService.update(changedUser,changedUser.username).subscribe(
        {
          next: (data: User) => {
            this.router.navigate(['users-view'])
          },
        } 
      );
    } 
    }

    delete(){
      const username=this.editAccountDataForm.value.username ?? ''
      this.userService.deleteUser(username).subscribe(
        {
          next: () => {
            this.router.navigate(['users-view'])
          },
        } 
      );

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
      if (selectedRole === 'ADMIN') {
        this.editAccountDataForm.get('requestNotification')?.disable();
        this.editAccountDataForm.get('cancellationNotification')?.disable();
        this.editAccountDataForm.get('ownerRatingNotification')?.disable();
        this.editAccountDataForm.get('accommodationRatingNotification')?.disable();
        this.editAccountDataForm.get('ownerRepliedNotification')?.disable();
      } else if (selectedRole === 'GUEST') {
        this.editAccountDataForm.get('requestNotification')?.disable();
        this.editAccountDataForm.get('cancellationNotification')?.disable();
        this.editAccountDataForm.get('ownerRatingNotification')?.disable();
        this.editAccountDataForm.get('accommodationRatingNotification')?.disable();
        this.editAccountDataForm.get('ownerRepliedNotification')?.enable();
      } else if (selectedRole === 'OWNER') {
        this.editAccountDataForm.get('requestNotification')?.enable();
        this.editAccountDataForm.get('cancellationNotification')?.enable();
        this.editAccountDataForm.get('ownerRatingNotification')?.enable();
        this.editAccountDataForm.get('accommodationRatingNotification')?.enable();
        this.editAccountDataForm.get('ownerRepliedNotification')?.disable();
      }
    }

    passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;
  
      return password === confirmPassword ? null : { passwordMismatch: true };
    }
  
    get isFormValid(): boolean {
      return this.editAccountDataForm.valid;
  }

}
