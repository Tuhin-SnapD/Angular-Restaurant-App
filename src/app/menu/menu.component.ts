import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { flyInOut, expand } from '../animations/app.animation';


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
			  @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
	  this.dishService.getDishes()
	  	.subscribe(dishes => this.dishes = dishes,
				  errmess => this.errMess = <any>errmess);
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
