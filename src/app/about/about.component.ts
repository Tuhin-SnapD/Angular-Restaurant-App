import { Component, OnInit, Inject } from '@angular/core';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { flyInOut, expand } from '../animations/app.animation';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
	  '[@flyInOut]': 'true',
	  'style': 'display: block;'
  },
  animations: [
	  flyInOut(),
	  expand()
  ]
})
export class AboutComponent implements OnInit {
	
	leaders: Leader[];
	errMess: string;
	
  	  constructor(private leaderService: LeaderService,
			  @Inject('BaseURL') private BaseURL) { }

  	ngOnInit() {
		console.log('About component initializing...');
		this.leaderService.getLeaders()
			.subscribe(leaders => {
				console.log('Leaders received in about:', leaders);
				console.log('First leader image URL:', leaders[0] ? leaders[0].image : 'No leaders');
				this.leaders = leaders;
			},
					  errmess => {
				console.error('Error loading leaders:', errmess);
				this.errMess = <any>errmess;
			});
	}

}
