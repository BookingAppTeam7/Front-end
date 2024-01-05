import { TimeSlot } from "src/app/accommodation/accommodation/model/timeSlot.model";
import { ReservationStatusEnum } from "../enums/reservationStatusEnum";
import { PriceTypeEnum } from "../enums/priceTypeEnum";

export interface Reservation{
    id?: number;
    accommodationId: number;
    userId: string;
    timeSlot:TimeSlot;
    status:ReservationStatusEnum;
    numberOfGuests:number;
    price:number;
    priceType:PriceTypeEnum;
}