import { RoleEnum } from "./userEnums.model";

export interface UserPostDTO {
    firstName: string |null |undefined;
    lastName: string |null |undefined;
    username: string |null |undefined;
    password:string |null |undefined;
    passwordConfirmation:string |null |undefined;
    role: RoleEnum;
    address: string |null |undefined;
    phoneNumber: string |null |undefined;
    reservationRequestNotification:boolean,
    reservationCancellationNotification:boolean,
    ownerRatingNotification:boolean,
    accommodationRatingNotification:boolean,
    ownerRepliedToRequestNotification:boolean,
    deleted:boolean
  }