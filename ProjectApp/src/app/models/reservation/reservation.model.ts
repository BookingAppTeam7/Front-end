import { TimeSlot } from "src/app/accommodation/accommodation/model/timeSlot.model";
import { ReservationStatusEnum } from "../enums/reservationStatusEnum";

export interface Reservation{
    id?: number;
    accommodationId: number;
    userId: number;
    timeSlot:TimeSlot;
    status:ReservationStatusEnum;
}