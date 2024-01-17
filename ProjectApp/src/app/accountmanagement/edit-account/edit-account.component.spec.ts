// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { EditAccountComponent } from './edit-account.component';

// describe('EditAccountComponent', () => {
//   let component: EditAccountComponent;
//   let fixture: ComponentFixture<EditAccountComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [EditAccountComponent]
//     });
//     fixture = TestBed.createComponent(EditAccountComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
import { ComponentFixture, TestBed } from '@angular/core/testing';
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



// Importujte module koji su potrebni za EditAccountComponent
// Ako EditAccountComponent koristi druge komponente, servise ili module, uključite ih ovde.
// Na primer:
// import { FormsModule } from '@angular/forms';

describe('EditAccountComponent', () => {
  let component: EditAccountComponent;
  let fixture: ComponentFixture<EditAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      //declarations: [EditAccountComponent],
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
      ],
    });
    
    fixture = TestBed.createComponent(EditAccountComponent);
    //component = fixture.componentInstance;
    component=fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

