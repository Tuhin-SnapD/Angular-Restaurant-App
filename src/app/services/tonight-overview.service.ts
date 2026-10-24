import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { TonightOverview } from '../shared/tonight-overview';

@Injectable({ providedIn: 'root' })
export class TonightOverviewService {
  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }

  getTonight(): Observable<TonightOverview> {
    return this.http.get<TonightOverview>(baseURL + 'restaurant/overview')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
