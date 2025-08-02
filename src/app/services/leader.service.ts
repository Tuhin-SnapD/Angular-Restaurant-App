import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';
import { ImageUrlService } from './image-url.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  	constructor(private  http: HttpClient,
				private processHTTPMsgService: ProcessHTTPMsgService,
				private imageUrlService: ImageUrlService) { }
	
	getLeaders(): Observable<Leader[]> {
		console.log('Fetching leaders from:', baseURL + 'leaders');
		return this.http.get<any[]>(baseURL + 'leaders')
      .pipe(map(leaders => {
        console.log('Raw leaders from backend:', leaders);
        return leaders.map(leader => {
          const mappedLeader = {
            id: leader._id,
            name: leader.name,
            image: this.imageUrlService.getImageUrl(leader.image),
            designation: leader.designation,
            abbr: leader.abbr,
            featured: leader.featured,
            description: leader.description
          };
          console.log('Mapped leader:', mappedLeader);
          return mappedLeader;
        });
      }))
      .pipe(catchError(this.processHTTPMsgService.handleError));
	}
	
	getLeader(id: string): Observable<Leader> {
		return this.http.get<any>(baseURL + 'leaders/' + id)
      .pipe(map(leader => ({
        id: leader._id,
        name: leader.name,
        image: this.imageUrlService.getImageUrl(leader.image),
        designation: leader.designation,
        abbr: leader.abbr,
        featured: leader.featured,
        description: leader.description
      })))
      .pipe(catchError(this.processHTTPMsgService.handleError));
	}
	
	getFeaturedLeader(): Observable<Leader> {
		return this.http.get<any[]>(baseURL + 'leaders?featured=true')
      .pipe(map(leaders => leaders[0]))
      .pipe(map(leader => ({
        id: leader._id,
        name: leader.name,
        image: this.imageUrlService.getImageUrl(leader.image),
        designation: leader.designation,
        abbr: leader.abbr,
        featured: leader.featured,
        description: leader.description
      })))
      .pipe(catchError(this.processHTTPMsgService.handleError));
	}
	
}
