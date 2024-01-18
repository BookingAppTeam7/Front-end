import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { EditAccountComponent } from './edit-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { RoleEnum, StatusEnum } from 'src/app/models/userEnums.model';
import { UserPutDTO } from 'src/app/models/userPutDTO.model';
import { User } from 'src/app/models/user.model';
import { UserGetDTO } from 'src/app/models/userGetDTO.model';
import { CommonModule } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';


describe('EditAccountComponent', () => {
  let component: EditAccountComponent;
  let fixture: ComponentFixture<EditAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        EditAccountComponent,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatSelectModule,
        MatSlideToggleModule,
        HttpClientModule,
        BrowserAnimationsModule,
        CommonModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: {} },
        { provide: Router, useValue: {} },
        UserService,
        JwtHelperService,
        MatSnackBar,
      ],
    });

    fixture = TestBed.createComponent(EditAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  })


  it('Should form fields controls be initially empty/disabled', () => {
    expect(component.editAccountDataForm.get('name')?.value).toEqual('');
    expect(component.editAccountDataForm.get('surname')?.value).toEqual('');
    expect(component.editAccountDataForm.get('username')?.value).toEqual('');
    expect(component.editAccountDataForm.get('password')?.value).toEqual('');
    expect(component.editAccountDataForm.get('confirmPassword')?.value).toEqual('');
    expect(component.editAccountDataForm.get('address')?.value).toEqual('');
    expect(component.editAccountDataForm.get('phoneNumber')?.value).toEqual('');
    expect(component.editAccountDataForm.get('role')?.value).toEqual('');
    expect(component.editAccountDataForm.get('requestNotification')?.disabled).toBeTruthy();
    expect(component.editAccountDataForm.get('cancellationNotification')?.disabled).toBeTruthy();
    expect(component.editAccountDataForm.get('ownerRatingNotification')?.disabled).toBeTruthy();
    expect(component.editAccountDataForm.get('accommodationRatingNotification')?.disabled).toBeTruthy();
    expect(component.editAccountDataForm.get('ownerRepliedNotification')?.disabled).toBeTruthy();

  });

  it('should not make input into username input field', () => {

    let el = fixture.debugElement.query(By.css('[formControlName=\'username\']')).nativeElement;
    expect(el.getAttribute('readonly')).toEqual('true');

  });


  it('should make input into another form fields (except username) field', () => {

    let el = fixture.debugElement.query(By.css('[formControlName=\'name\']')).nativeElement;
    expect(el.getAttribute('readonly')).toEqual(null);
    el = fixture.debugElement.query(By.css('[formControlName=\'surname\']')).nativeElement;
    expect(el.getAttribute('readonly')).toEqual(null);
    el = fixture.debugElement.query(By.css('[formControlName=\'phoneNumber\']')).nativeElement;
    expect(el.getAttribute('readonly')).toEqual(null);
    el = fixture.debugElement.query(By.css('[formControlName=\'address\']')).nativeElement;
    expect(el.getAttribute('readonly')).toEqual(null);
    el = fixture.debugElement.query(By.css('[formControlName=\'password\']')).nativeElement;
    expect(el.getAttribute('readonly')).toEqual(null);
    el = fixture.debugElement.query(By.css('[formControlName=\'confirmPassword\']')).nativeElement;
    expect(el.getAttribute('readonly')).toEqual(null);

  });


  // it('should call saveChanges method on click button', async () => {
  //   const saveChangesSpy = spyOn(component, 'saveChanges');
  
  //   let el = fixture.debugElement.query(By.css('#saveButton')).nativeElement;
  //   el.click();

  
  //   expect(saveChangesSpy).toHaveBeenCalled();
  // });
  
  
  it('should set form values based on user data', fakeAsync(() => {
    const mockUser: UserGetDTO = {
      firstName: "FirstNameTest",
      lastName: "LastNameTest",
      username: "username@test.com",
      role: RoleEnum.GUEST,
      address: "AddressTest",
      phoneNumber: "1234567890",
      status: StatusEnum.ACTIVE,
      reservationRequestNotification:false,
      reservationCancellationNotification:false,
      ownerRatingNotification:false,
      accommodationRatingNotification:false,
      ownerRepliedToRequestNotification:true,
      deleted:false,
      token:"tokenTest",
      jwt:"jwtTest",
      favouriteAccommodations:"acc1,acc2"
    };

    const userServiceSpy = jasmine.createSpyObj('UserService', ['getById']);
    userServiceSpy.getById.and.returnValue({ subscribe: (callback: (user: UserGetDTO) => void) => callback(mockUser) });

    component['userService'] = userServiceSpy;

    component.ngOnInit();
    tick(); //cekanje da se zavrsi asinhrona operacija

    fixture.detectChanges(); 

    component.editAccountDataForm.patchValue({
      name: mockUser.firstName,
      surname: mockUser.lastName,
      username: mockUser.username,
      phoneNumber: mockUser.phoneNumber,
      address: mockUser.address,
      status:mockUser.status, 
    });

    component.setNotificationControls(mockUser.role);

    expect(component.editAccountDataForm.get('name')?.value).toEqual('FirstNameTest');
    expect(component.editAccountDataForm.get('surname')?.value).toEqual('LastNameTest');
    expect(component.editAccountDataForm.get('username')?.value).toEqual('username@test.com');
    expect(component.editAccountDataForm.get('password')?.value).toEqual('');
    expect(component.editAccountDataForm.get('confirmPassword')?.value).toEqual('');
    expect(component.editAccountDataForm.get('address')?.value).toEqual('AddressTest');
    expect(component.editAccountDataForm.get('phoneNumber')?.value).toEqual('1234567890');

    const usernameInput = fixture.debugElement.query(By.css('input[formControlName="username"]'));
    expect(usernameInput.nativeElement.readOnly).toBeTruthy;

    expect(component.editAccountDataForm.get('requestNotification')?.enabled).toBe(
      mockUser.role === RoleEnum.OWNER
    );
    expect(component.editAccountDataForm.get('cancellationNotification')?.enabled).toBe(
      mockUser.role === RoleEnum.OWNER
    );
    expect(component.editAccountDataForm.get('ownerRatingNotification')?.enabled).toBe(
      mockUser.role === RoleEnum.OWNER
    );
    expect(component.editAccountDataForm.get('accommodationRatingNotification')?.enabled).toBe(
      mockUser.role === RoleEnum.OWNER
    );
    expect(component.editAccountDataForm.get('ownerRepliedNotification')?.enabled).toBe(
      mockUser.role === RoleEnum.GUEST
    );

  }));

  it('should set form validity to false if invalid phone data is provided - incorrect digits number', () => {
    component.editAccountDataForm.setValue({
      name: 'John',
      surname: 'Doe',
      phoneNumber: '123', // ne postujemo regex
      address: 'Test Address',
      username: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      status: 'active',
      role: 'GUEST',
      requestNotification: true,
      cancellationNotification: false,
      accommodationRatingNotification: false,
      ownerRatingNotification: false,
      ownerRepliedNotification: true,
    });

    expect(component.isFormValid).toBeFalse();
  });

  // it('should set form validity to false if password confirmation is not correct', () => {
  //   component.editAccountDataForm.setValue({
  //     name: 'John',
  //     surname: 'Doe',
  //     phoneNumber: '1234567890', 
  //     address: 'Test Address',
  //     username: 'test@example.com',
  //     password: 'password123',  //missmathing passwords
  //     confirmPassword: 'password456',
  //     status: 'active',
  //     role: 'GUEST',
  //     requestNotification: false,
  //     cancellationNotification: false,
  //     accommodationRatingNotification: false,
  //     ownerRatingNotification: false,
  //     ownerRepliedNotification: true,
  //   });

  //   expect(component.isFormValid).toBeFalse();
  // });

  it('should show password mismatch error message', fakeAsync(() => {
    component.ngOnInit();
    tick();
  
    // Popunite formu sa podacima, uključujući dva različita passworda
    component.editAccountDataForm.setValue({
      name: 'John',
      surname: 'Doe',
      phoneNumber: '1234567890', 
      address: 'Test Address',
      username: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password456', // Različit od passworda
      status: 'active',
      role: 'GUEST',
      requestNotification: false,
      cancellationNotification: false,
      accommodationRatingNotification: false,
      ownerRatingNotification: false,
      ownerRepliedNotification: true,
    });
  
    fixture.detectChanges();
    tick();
  
    fixture.whenStable().then(() => {
      const errorMessage = fixture.debugElement.query(By.css('mat-error#errorConfirmationPassword')).nativeElement;
      expect(errorMessage.textContent).toContain('Passwords do not match');
    });
 
  }));


  it('Should show required error message for password field', fakeAsync(() => {
    component.ngOnInit();
    tick();
  
    const passwordInput = fixture.debugElement.query(By.css('[formControlName=\'password\']')).nativeElement;
  
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick(); 
  
    fixture.whenStable().then(() => {
      const errorMessage = fixture.debugElement.query(By.css('#errorPassword')).nativeElement;
      expect(errorMessage.textContent).toContain('Password is required');
    });
  }));

  it('Should show required error message for confirm password field', fakeAsync(() => {
    component.ngOnInit();
    tick();
  
    const confirmPasswordInput = fixture.debugElement.query(By.css('[formControlName=\'confirmPassword\']')).nativeElement;
  
    confirmPasswordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick(); 
  
    fixture.whenStable().then(() => {
      const errorMessage = fixture.debugElement.query(By.css('#errorConfirmationPassword')).nativeElement;
      expect(errorMessage.textContent).toContain('Confirm Password is required');
    });
  }));
  


 });


