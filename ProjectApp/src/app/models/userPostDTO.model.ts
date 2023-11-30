import { RoleEnum } from "./userEnums.model";

export interface UserPostDTO {
    firstName: string;
    lastName: string;
    username: string;
    password:string;
    role: RoleEnum;
    address: string;
    phoneNumber: string;
  }