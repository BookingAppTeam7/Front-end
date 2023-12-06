import { RoleEnum } from "./userEnums.model";

export interface UserPostDTO {
    firstName: string;
    lastName: string;
    username: string;
    password:string;
    passwordConfirmation:string;
    role: RoleEnum;
    address: string;
    phoneNumber: string;
    reservationRequestNotification:boolean,
    reservationCancellationNotification:boolean,
    ownerRatingNotification:boolean,
    accommodationRatingNotification:boolean,
    ownerRepliedToRequestNotification:boolean,
    deleted:boolean
  }