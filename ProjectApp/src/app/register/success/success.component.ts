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
      this.userService.getByToken(token).subscribe((user: User) => {
        // Find the user that matches by token
        //const matchedUser = users.find((user: UserGetDTO) => user.token === token);
          console.log(user);
          if(user){
            this.user=user;
              // Change the status of the matched user
          user.status = StatusEnum.ACTIVE;
          const updateUser: UserPutDTO = {
            firstName: user.firstName,
            lastName: user.lastName,
            //username: user.username,
            password: user.password,
            passwordConfirmation: user.password, 
            status: StatusEnum.ACTIVE,
            //role: user.role,
            address: user.address,
            phoneNumber: user.phoneNumber,
            reservationRequestNotification: user.reservationRequestNotification, 
            reservationCancellationNotification: user.reservationCancellationNotification, 
            ownerRatingNotification: user.ownerRatingNotification, 
            accommodationRatingNotification: user.accommodationRatingNotification, 
            ownerRepliedToRequestNotification: user.ownerRepliedToRequestNotification, 
            deleted: user.deleted,
            token: user.token,
            favouriteAccommodations: user.favouriteAccommodations
          //  jwt:user.jwt
          };

          // Update the user using the UserService
          this.userService.update(updateUser, user.username).subscribe(updatedUser => {
            console.log('Updated User:', updatedUser);
            //this.user = updatedUser; // Optionally assign the updated user to a component property
          }, error => {
            console.error('Error updating user:', error);
          });
          }
          
         else {
          console.error('User not found for token:', token);
        }
      });
    
  });
  }
}
