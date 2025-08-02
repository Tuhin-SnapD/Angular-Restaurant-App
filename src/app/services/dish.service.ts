import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';
import { ImageUrlService } from './image-url.service';


@Injectable({
  providedIn: 'root'
})
export class DishService {
	
  constructor(private  http: HttpClient,
			  private processHTTPMsgService: ProcessHTTPMsgService,
			  private imageUrlService: ImageUrlService) { }
	
  getDishes(): Observable<Dish[]> {
    const url = baseURL + 'dishes';
    console.log('Fetching dishes from:', url);
    return this.http.get<any[]>(url)
      .pipe(map(dishes => {
        console.log('Raw dishes from backend:', dishes);
        return dishes.map(dish => {
          const mappedDish = {
            id: dish._id,
            name: dish.name,
            image: this.imageUrlService.getImageUrl(dish.image),
            category: dish.category,
            featured: dish.featured,
            label: dish.label,
            price: dish.price.toString(),
            description: dish.description,
            comments: dish.comments ? dish.comments.map((comment: any) => ({
              rating: comment.rating,
              comment: comment.comment,
              author: comment.author,
              date: comment.createdAt || comment.date
            })) : []
          };
          console.log('Mapped dish:', mappedDish);
          return mappedDish;
        });
      }))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  
   getDish(id: string): Observable<Dish> {
    return this.http.get<any>(baseURL + 'dishes/' + id)
      .pipe(map(dish => ({
        id: dish._id,
        name: dish.name,
        image: this.imageUrlService.getImageUrl(dish.image),
        category: dish.category,
        featured: dish.featured,
        label: dish.label,
        price: dish.price.toString(),
        description: dish.description,
        comments: dish.comments ? dish.comments.map((comment: any) => ({
          rating: comment.rating,
          comment: comment.comment,
          author: comment.author,
          date: comment.createdAt || comment.date
        })) : []
      })))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
	
  getFeaturedDish(): Observable<Dish> {
    return this.http.get<any[]>(baseURL + 'dishes?featured=true')
      .pipe(map(dishes => dishes[0]))
      .pipe(map(dish => ({
        id: dish._id,
        name: dish.name,
        image: this.imageUrlService.getImageUrl(dish.image),
        category: dish.category,
        featured: dish.featured,
        label: dish.label,
        price: dish.price.toString(),
        description: dish.description,
        comments: dish.comments ? dish.comments.map((comment: any) => ({
          rating: comment.rating,
          comment: comment.comment,
          author: comment.author,
          date: comment.createdAt || comment.date
        })) : []
      })))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
	
      getDishIds(): Observable<string[]> {
     return this.getDishes()
       .pipe(map(dishes => dishes.map(dish => dish.id)))
       .pipe(catchError(error => of([])));
   }
	
  putDish(dish: Dish): Observable<Dish> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<Dish>(baseURL + 'dishes/' + dish.id, dish, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
	
}
