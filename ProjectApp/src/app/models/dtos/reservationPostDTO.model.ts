import { TimeSlot } from "src/app/accommodation/accommodation/model/timeSlot.model";

export interface ReservationPostDTO{
    accommodationId: number;
    userId: number;
    timeSlot: TimeSlot;
    numberOfGuests: number;
}