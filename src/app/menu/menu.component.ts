import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { flyInOut, expand, fadeInUp, fadeInScale } from '../animations/app.animation';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: { '[@flyInOut]': 'true', 'style': 'display: block;' },
  animations: [flyInOut(), expand(), fadeInUp(), fadeInScale()]
})
export class MenuComponent implements OnInit {
  dishes: Dish[] = [];
  filteredDishes: Dish[] = [];
  categories: string[] = [];
  selectedCategory: string = null;
  searchQuery = '';
  sortOrder = 'featured';
  errMess: string;
  loading = true;

  constructor(private dishService: DishService,
              private route: ActivatedRoute,
              private router: Router,
              @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.searchQuery = (params.get('search') || '').trim();
      this.applyFilters();
    });
    this.loadDishes();
  }

  loadDishes() {
    this.loading = true;
    this.errMess = null;
    this.dishService.getDishes().subscribe(dishes => {
      this.dishes = dishes || [];
      this.categories = Array.from(new Set(this.dishes.map(dish => dish.category).filter(category => !!category)));
      this.loading = false;
      this.applyFilters();
    }, errmess => {
      this.errMess = <any>errmess;
      this.loading = false;
    });
  }

  applyFilters() {
    let result = (this.dishes || []).filter(dish => {
      const inCategory = !this.selectedCategory || dish.category === this.selectedCategory;
      const query = (this.searchQuery || '').toLowerCase();
      const inSearch = !query || [dish.name, dish.description, dish.category, dish.label]
        .filter(value => !!value)
        .some(value => value.toLowerCase().indexOf(query) !== -1);
      return inCategory && inSearch;
    });
    result = result.slice().sort((a, b) => {
      if (this.sortOrder === 'price-low') { return Number(a.price) - Number(b.price); }
      if (this.sortOrder === 'price-high') { return Number(b.price) - Number(a.price); }
      if (this.sortOrder === 'rating') { return (this.getAverageRating(b) || 0) - (this.getAverageRating(a) || 0); }
      return Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name);
    });
    this.filteredDishes = result;
  }

  filterByCategory(category: string) {
    this.selectedCategory = category === 'all' ? null : category;
    this.applyFilters();
  }

  categoryLabel(category: string): string {
    const names = { appetizer: 'Small plates', mains: 'Mains', dessert: 'Dessert', beverage: 'Drinks' };
    return names[category] || category;
  }

  clearFilters() {
    this.selectedCategory = null;
    this.searchQuery = '';
    this.applyFilters();
    this.router.navigate([], { relativeTo: this.route, queryParams: { search: null }, queryParamsHandling: 'merge' });
  }

  getFeaturedDishesCount(): number {
    return this.dishes ? this.dishes.filter(dish => dish.featured).length : 0;
  }

  getReviewCount(): number {
    return (this.dishes || []).reduce((count, dish) => count + (dish.comments ? dish.comments.length : 0), 0);
  }

  getAverageRating(dish: Dish): number {
    if (!dish || !dish.comments || dish.comments.length === 0) { return 0; }
    const total = dish.comments.reduce((sum, comment) => sum + Number(comment.rating || 0), 0);
    return total / dish.comments.length;
  }

  getMenuAverageRating(): string {
    const comments = (this.dishes || []).reduce((all, dish) => all.concat(dish.comments || []), []);
    if (!comments.length) { return '—'; }
    const total = comments.reduce((sum, comment) => sum + Number(comment.rating || 0), 0);
    return (total / comments.length).toFixed(1);
  }
}
