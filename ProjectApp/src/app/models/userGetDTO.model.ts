import { RoleEnum, StatusEnum } from "./userEnums.model";

export interface UserGetDTO {
    id?:number,
    firstName: string;
    lastName: string;
    username: string;
    role: RoleEnum;
    address: string;
    phoneNumber: string;
    status: StatusEnum;
    token:string;
  }