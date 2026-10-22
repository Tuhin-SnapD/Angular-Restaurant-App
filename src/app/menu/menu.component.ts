import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { flyInOut, expand, fadeInUp, fadeInScale } from '../animations/app.animation';


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
	  expand(),
	  fadeInUp(),
	  fadeInScale()
  ]
})
export class MenuComponent implements OnInit {

  dishes: Dish[];
  filteredDishes: Dish[] = [];
  categories: string[] = [];
  selectedCategory: string = null;
  searchQuery = '';
  errMess: string;
  gridCols: number = 2;
  gridRowHeight: string = '200px';

  constructor(private dishService: DishService,
			  private route: ActivatedRoute,
			  private router: Router,
			  @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
	  this.route.queryParamMap.subscribe(params => {
		  this.searchQuery = (params.get('search') || '').trim();
		  this.applyFilters();
	  });

	  this.dishService.getDishes()
	  	.subscribe(dishes => {
			  this.dishes = dishes;
			  this.categories = Array.from(new Set(dishes.map(dish => dish.category)));
			  this.applyFilters();
		  },
		  errmess => this.errMess = <any>errmess);
    this.onResize();
  }

  applyFilters() {
	  let dishes = this.dishes || [];

	  if (this.selectedCategory) {
		  dishes = dishes.filter(dish => dish.category === this.selectedCategory);
	  }

	  if (this.searchQuery) {
		  const query = this.searchQuery.toLowerCase();
		  dishes = dishes.filter(dish =>
			  [dish.name, dish.description, dish.category, dish.label]
				  .filter(value => !!value)
				  .some(value => value.toLowerCase().indexOf(query) !== -1)
		  );
	  }

	  this.filteredDishes = dishes;
  }

  filterByCategory(category: string) {
	  this.selectedCategory = category;
	  this.applyFilters();
  }

  clearFilters() {
	  this.selectedCategory = null;
	  this.searchQuery = '';
	  this.applyFilters();
	  this.router.navigate([], {
		  relativeTo: this.route,
		  queryParams: { search: null }
	  });
  }

  getFeaturedDishesCount(): number {
	  return this.dishes ? this.dishes.filter(dish => dish.featured).length : 0;
  }

  getFavoriteDishesCount(): number {
	  return this.dishes ? this.dishes.filter(dish => dish.favorite).length : 0;
  }

  getAverageRating(dish: Dish): number {
	  if (!dish.comments || dish.comments.length === 0) {
		  return 0;
	  }
	  const total = dish.comments.reduce((sum, comment) => sum + comment.rating, 0);
	  return Math.round(total / dish.comments.length);
  }

  toggleFavorite(dish: Dish, event: Event) {
	  event.stopPropagation();
	  dish.favorite = !dish.favorite;
  }

  retryLoad() {
	  this.errMess = null;
	  this.dishes = null;
	  this.filteredDishes = [];
	  this.categories = [];
	  this.ngOnInit();
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
