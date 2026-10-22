import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProcessHTTPMsgService {
	
	constructor() { }
	
	
	public handleError(error:HttpErrorResponse | any) {
		let errMsg: string;
		
		if (error.error instanceof ErrorEvent) {
			errMsg = error.error.message;
		}
		else if (error.error && typeof error.error === 'object' && error.error.error) {
			errMsg = error.error.error;
		}
		else if (typeof error.error === 'string' && error.error) {
			errMsg = error.error;
		}
		else {
			errMsg = `${error.status} - ${error.statusText || 'Request failed'}`;
		}
		
		return throwError(errMsg);
	}
	
}
