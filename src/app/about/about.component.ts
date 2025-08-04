import { Component, OnInit, Inject } from '@angular/core';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { expand } from '../animations/app.animation';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
	  'style': 'display: block;'
  },
  animations: [
	  expand()
  ]
})
export class AboutComponent implements OnInit {
	
	leaders: Leader[];
	errMess: string;
	
  	  constructor(private leaderService: LeaderService,
			  @Inject('BaseURL') private BaseURL) { }

  	ngOnInit() {
		console.log('About component initialized');
		this.loadLeaders();
	}

	loadLeaders() {
		console.log('Loading leaders...');
		this.leaderService.getLeaders()
			.subscribe(leaders => {
				console.log('Leaders loaded:', leaders);
				this.leaders = leaders;
			},
					  errmess => {
				console.error('Error loading leaders:', errmess);
				this.errMess = <any>errmess;
			});
	}

	retryLoad() {
		this.errMess = null;
		this.leaders = null;
		this.loadLeaders();
	}

}
