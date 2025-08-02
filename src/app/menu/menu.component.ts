import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { flyInOut, expand } from '../animations/app.animation';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
	  '[@flyInOut]': 'true',
	  'style': 'display: block;'
  },
  animations: [
	  flyInOut(),
	  expand()
  ]
})
export class MenuComponent implements OnInit {

  dishes: Dish[];
  errMess: string;
  gridCols: number = 2;
  gridRowHeight: string = '200px';

  constructor(private dishService: DishService,
			  @Inject('BaseURL') private BaseURL,
			  private http: HttpClient) { }

  ngOnInit() {
	  console.log('Menu component initializing...');
	  console.log('BaseURL:', this.BaseURL);
	  
	  // Test direct HTTP request
	  this.http.get('http://localhost:8000/dishes').subscribe(
	    (data: any) => {
	      console.log('Direct HTTP test successful:', data);
	    },
	    (error) => {
	      console.error('Direct HTTP test failed:', error);
	    }
	  );
	  
	  this.dishService.getDishes()
	  	.subscribe(dishes => {
        console.log('Dishes received in menu:', dishes);
        console.log('First dish image URL:', dishes[0] ? dishes[0].image : 'No dishes');
        this.dishes = dishes;
      },
				  errmess => {
        console.error('Error loading dishes:', errmess);
        this.errMess = <any>errmess;
      });
    this.onResize();
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth < 768) {
      this.gridCols = 1;
      this.gridRowHeight = '180px';
    } else {
      this.gridCols = 2;
      this.gridRowHeight = '200px';
    }
  }

}
