import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { TonightOverviewService } from '../services/tonight-overview.service';
import { TonightOverview } from '../shared/tonight-overview';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: { 'style': 'display: block;' }
})
export class HomeComponent implements OnInit {
  dishes: Dish[] = [];
  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMess: string;
  promoErrMess: string;
  leaderErrMess: string;
  loading = true;
  tonight: TonightOverview;
  tonightLoading = true;

  constructor(private dishService: DishService,
              private promotionService: PromotionService,
              private leaderService: LeaderService,
              private tonightOverviewService: TonightOverviewService,
              private router: Router,
              @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.loadHome();
    this.tonightOverviewService.getTonight().subscribe(
      overview => { this.tonight = overview; this.tonightLoading = false; },
      () => { this.tonight = null; this.tonightLoading = false; }
    );
  }

  loadHome() {
    this.loading = true;
    this.dishErrMess = null;
    this.dishService.getDishes().subscribe(dishes => {
      this.dishes = dishes || [];
      this.dish = this.dishes.find(item => item.featured) || this.dishes[0];
      this.loading = false;
    }, errmess => {
      this.dishErrMess = <any>errmess;
      this.loading = false;
    });

    this.promotionService.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion,
      errmess => this.promoErrMess = <any>errmess);
    this.leaderService.getFeaturedLeader().subscribe(leader => this.leader = leader,
      errmess => this.leaderErrMess = <any>errmess);
  }

  get categoryCount(): number {
    return Array.from(new Set(this.dishes.map(dish => dish.category).filter(category => !!category))).length;
  }

  get reviewCount(): number {
    return this.dishes.reduce((count, dish) => count + (dish.comments ? dish.comments.length : 0), 0);
  }

  get averageRating(): string {
    const comments = this.dishes.reduce((all, dish) => all.concat(dish.comments || []), []);
    if (!comments.length) { return '—'; }
    const total = comments.reduce((sum, comment) => sum + Number(comment.rating || 0), 0);
    return (total / comments.length).toFixed(1);
  }

  ratingFor(dish: Dish): string {
    if (!dish || !dish.comments || !dish.comments.length) { return null; }
    const total = dish.comments.reduce((sum, comment) => sum + Number(comment.rating || 0), 0);
    return (total / dish.comments.length).toFixed(1);
  }

  navigateToDish(dish: Dish) {
    if (dish && dish.id) { this.router.navigate(['/dishdetail', dish.id]); }
  }
}
