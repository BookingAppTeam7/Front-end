import { TimeSlot } from "src/app/accommodation/accommodation/model/timeSlot.model";

export interface ReservationPostDTO{
    accommodationId: number;
    userId: string;
    timeSlot: TimeSlot;
    numberOfGuests: number;
}