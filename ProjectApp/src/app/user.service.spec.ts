import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { RoleEnum, StatusEnum } from './models/userEnums.model';
import { UserPutDTO } from './models/userPutDTO.model';
import { environment } from 'src/env/env';
import { UserServiceMock } from './mocks/user.mock.service';
import { User } from './models/user.model';

describe('UserService', () => {
  let userService: UserService;
  let httpTestingController: HttpTestingController;
  let userServiceMock: UserServiceMock; 

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        UserServiceMock
      ]
    });

    userService = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
    userServiceMock = TestBed.inject(UserServiceMock);  
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('should update user', () => {
    const username = 'testuser';
    const userPutDTO: UserPutDTO = {
        firstName: 'UpdatedFirstName',
        lastName: 'UpdatedLastName',
        password: 'UpdatedPassword',
        passwordConfirmation: 'UpdatedPassword',
        address: 'UpdatedAddress',
        phoneNumber: 'UpdatedPhoneNumber',
        status: StatusEnum.DEACTIVE, // Postavite odgovarajuću vrednost za status (StatusEnum)
        reservationRequestNotification: true,
        reservationCancellationNotification: false,
        ownerRatingNotification: true,
        accommodationRatingNotification: false,
        ownerRepliedToRequestNotification: true,
        deleted: false,
        token: 'UpdatedToken',
        favouriteAccommodations: 'acc1,acc2',
      };
      
      const mockUpdatedUser: User = {
        firstName: 'UpdatedFirstName',
        lastName: 'UpdatedLastName',
        username: 'UpdatedUsername',
        password: 'UpdatedPassword',
        role: RoleEnum.ADMIN,
        address: 'UpdatedAddress',
        phoneNumber: 'UpdatedPhoneNumber',
        status: StatusEnum.DEACTIVEACTIVE,
        reservationRequestNotification: true,
        reservationCancellationNotification: false,
        ownerRatingNotification: true,
        accommodationRatingNotification: false,
        ownerRepliedToRequestNotification: true,
        deleted: false,
        token: 'UpdatedToken',
        jwt: 'UpdatedJwt',
        favouriteAccommodations: 'acc1,acc2',
      };
      

    // Promenite liniju ispod
    spyOn(userServiceMock, 'getUsers').and.returnValue([mockUpdatedUser]);

    userService.update(userPutDTO, username).subscribe(updatedUser => {
      expect(updatedUser).toEqual(mockUpdatedUser);
    });

    const req = httpTestingController.expectOne(`${environment.apiHost}users/${username}`);
    expect(req.request.method).toEqual('PUT');
    req.flush(mockUpdatedUser);
  });

  it('should get user by username', () => {
    const username = 'testuser';
    const mockUser = userServiceMock.getUsers()[0];

    userService.getById(username).subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpTestingController.expectOne(`${environment.apiHost}users/username/${username}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockUser);
  });
});
