import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';
import { ImageUrlService } from './image-url.service';


@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private  http: HttpClient,
			  private processHTTPMsgService: ProcessHTTPMsgService,
			  private imageUrlService: ImageUrlService) { }
  
  getPromotions(): Observable<Promotion[]> {
	  return this.http.get<any[]>(baseURL + 'promotions')
      .pipe(map(promotions => promotions.map(promotion => ({
        id: promotion._id,
        name: promotion.name,
        image: this.imageUrlService.getImageUrl(promotion.image),
        label: promotion.label,
        price: promotion.price.toString(),
        featured: promotion.featured,
        description: promotion.description
      }))))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  
                   getPromotion(id: string): Observable<Promotion> {
  	  return this.http.get<any>(baseURL + 'promotions/' + id)
        .pipe(map(promotion => ({
          id: promotion._id,
          name: promotion.name,
          image: this.imageUrlService.getImageUrl(promotion.image),
          label: promotion.label,
          price: promotion.price.toString(),
          featured: promotion.featured,
          description: promotion.description
        })))
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }
	
  getFeaturedPromotion(): Observable<Promotion> {
	  return this.http.get<any[]>(baseURL + 'promotions?featured=true')
      .pipe(map(promotions => promotions[0]))
      .pipe(map(promotion => ({
        id: promotion._id,
        name: promotion.name,
        image: this.imageUrlService.getImageUrl(promotion.image),
        label: promotion.label,
        price: promotion.price.toString(),
        featured: promotion.featured,
        description: promotion.description
      })))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
	  
}
