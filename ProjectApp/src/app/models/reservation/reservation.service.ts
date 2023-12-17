import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/env/env";
import { ReservationPostDTO } from "../dtos/reservationPostDTO.model";
import { Reservation } from "./reservation.model";
import { ReservationPutDTO } from "../dtos/reservationPutDTO.model";

@Injectable({
    providedIn:'root'
})
export class ReservationService{
    constructor(private httpClient: HttpClient){

    }

    create(reservation: ReservationPostDTO): Observable<Reservation>{
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.httpClient.post<Reservation>(
            environment.apiHost+'reservations',
            JSON.stringify(reservation),
            {headers: headers}
        );
    }

    getById(id: number): Observable<Reservation | undefined>{
        return this.httpClient.get<Reservation>(
            environment.apiHost+'reservations/'+id);
    }

    getByAccommodationId(id: number): Observable<Reservation[] | undefined>{
        return this.httpClient.get<Reservation[]>(
            environment.apiHost+'reservations/accommodation/'+id);
    }

    update(updatedReservation:ReservationPutDTO, id:number):Observable<ReservationPutDTO>{
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.httpClient.put<ReservationPutDTO>(
            environment.apiHost+'reservations/'+id,
            JSON.stringify(updatedReservation),
            {headers: headers}
        );
    }
}