import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';
import { ReservationAvailability, ReservationResponse } from '../shared/reservation';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({ providedIn: 'root' })
export class ReservationService {
  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }

  getAvailability(date: string, partySize: number): Observable<ReservationAvailability> {
    const params = new HttpParams().set('date', date).set('partySize', String(partySize));
    return this.http.get<ReservationAvailability>(baseURL + 'reservations/availability', { params })
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  createReservation(reservation: Object): Observable<ReservationResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ReservationResponse>(baseURL + 'reservations', reservation, { headers })
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
