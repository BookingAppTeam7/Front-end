import { ChangeDetectorRef, Component } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, AbstractControl, ValidationErrors} from '@angular/forms';
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
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule,MatIconModule,MatButtonModule,MatSelectModule,
    MatSlideToggleModule,CommonModule],
})
export class RegisterFormComponent {
  color: ThemePalette = 'primary';
  disabled = false;
  checked = false;
  button_enabled=false;
  reservationRequestNotification: boolean = false;
  reservationCancellationNotification: boolean = false;
  ownerRatingNotification: boolean = false;
  accommodationRatingNotification: boolean = false;
  ownerRepliedToRequestNotification: boolean = false;

  createRegisterForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
    address: new FormControl('', Validators.required),
    username:  new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    requestNotification: new FormControl(),
    cancellationNotification: new FormControl(),
    accommodationRatingNotification: new FormControl(),
    ownerRatingNotification: new FormControl(),
    ownerRepliedNotification: new FormControl(),
    
  }, { validators: this.passwordMatchValidator });

  hide = true;

  constructor(private cdr: ChangeDetectorRef,private userService: UserService, private router: Router) {
    this.createRegisterForm.get('requestNotification')?.disable();
    this.createRegisterForm.get('cancellationNotification')?.disable();
    this.createRegisterForm.get('ownerRatingNotification')?.disable();
    this.createRegisterForm.get('accommodationRatingNotification')?.disable();
    this.createRegisterForm.get('ownerRepliedNotification')?.disable();
  }

  ngOnInit(){

  }

  navigateToHome() {
    this.router.navigate(['home']);
  }

  register() {
    this.button_enabled=true;

    const userRoleValue: string | undefined = this.createRegisterForm.get('role')?.value ?? undefined;
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
            this.router.navigate(['home'])
          },
        }
      );
    }
    this.cdr.markForCheck();
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

  onRoleSelectionChange(event: MatSelectChange) {
    const selectedRole = event.source.value;
    console.log('Promenjena uloga:', selectedRole);

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

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  get isFormValid(): boolean {
    return this.createRegisterForm.valid;
}
}
