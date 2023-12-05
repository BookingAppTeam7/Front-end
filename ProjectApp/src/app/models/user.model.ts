import { RoleEnum, StatusEnum } from "./userEnums.model";

export interface User {
    //id?: number;
    firstName: string;
    lastName: string;
    username: string;
    password:string;
    role: RoleEnum;
    address: string;
    phoneNumber: string;
    status: StatusEnum;
  }