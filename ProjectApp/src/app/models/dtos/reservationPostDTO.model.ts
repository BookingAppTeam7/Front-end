import { TimeSlot } from "src/app/accommodation/accommodation/model/timeSlot.model";
import { PriceTypeEnum } from "../enums/priceTypeEnum";

export interface ReservationPostDTO{
    accommodationId: number;
    userId: string;
    timeSlot: TimeSlot;
    numberOfGuests: number;
    price:number;
    priceType:PriceTypeEnum;
}