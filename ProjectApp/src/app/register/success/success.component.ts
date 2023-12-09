import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { StatusEnum } from 'src/app/models/userEnums.model';
import { UserGetDTO } from 'src/app/models/userGetDTO.model';
import { UserPutDTO } from 'src/app/models/userPutDTO.model';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent{
  user: User;
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private userService:UserService
  ){}

  ngOnInit(){
    this.route.paramMap.subscribe((params: ParamMap) => {
      const token = params.get('token')!;
      console.log(token);

      // Fetch all users from the service
      this.userService.getAll().subscribe((users: User[]) => {
        // Find the user that matches by token
        const matchedUser = users.find((user: User) => user.token === token);

        if (matchedUser) {
          // Change the status of the matched user
          matchedUser.status = StatusEnum.ACTIVE;
          this.user=matchedUser;
          const updateUser: UserPutDTO = {
            firstName: matchedUser.firstName,
            lastName: matchedUser.lastName,
            username: matchedUser.username,
            password: matchedUser.password,
            passwordConfirmation: matchedUser.password, 
            status: StatusEnum.ACTIVE,
            role: matchedUser.role,
            address: matchedUser.address,
            phoneNumber: matchedUser.phoneNumber,
            reservationRequestNotification: matchedUser.reservationRequestNotification, 
            reservationCancellationNotification: matchedUser.reservationCancellationNotification, 
            ownerRatingNotification: matchedUser.ownerRatingNotification, 
            accommodationRatingNotification: matchedUser.accommodationRatingNotification, 
            ownerRepliedToRequestNotification: matchedUser.ownerRepliedToRequestNotification, 
            deleted: matchedUser.deleted,
            token:matchedUser.token
          };

          // Update the user using the UserService
          this.userService.update(updateUser, matchedUser.username).subscribe(updatedUser => {
            console.log('Updated User:', updatedUser);
            this.user = updatedUser; // Optionally assign the updated user to a component property
          }, error => {
            console.error('Error updating user:', error);
          });
        } else {
          console.error('User not found for token:', token);
        }
      });
    });
  }
}
