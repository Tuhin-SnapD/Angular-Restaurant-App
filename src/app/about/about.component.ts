import { Component, OnInit, Inject } from '@angular/core';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: { 'style': 'display: block;' }
})
export class AboutComponent implements OnInit {
  leaders: Leader[] = [];
  errMess: string;
  loading = true;

  constructor(private leaderService: LeaderService,
              @Inject('BaseURL') private BaseURL) { }

  ngOnInit() { this.loadLeaders(); }

  loadLeaders() {
    this.loading = true;
    this.errMess = null;
    this.leaderService.getLeaders().subscribe(leaders => {
      this.leaders = leaders || [];
      this.loading = false;
    }, errmess => {
      this.errMess = <any>errmess;
      this.loading = false;
    });
  }
}
