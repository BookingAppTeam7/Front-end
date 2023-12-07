import { ReviewEnum } from "src/app/models/enums/reviewEnum";
export interface Review{
    id?:number;
    userId:String;
    type:ReviewEnum;  //OWNER or ACCOMMODATION
    comment:String;
    grade:number;
    dateTime:Date;
}