import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  showBackToTop = false;
  currentYear = new Date().getFullYear();

  constructor(private router: Router) { }

  ngOnInit() {
    this.checkScrollPosition();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.checkScrollPosition();
  }

  checkScrollPosition() {
    this.showBackToTop = window.pageYOffset > 300;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openReservation() {
    this.router.navigate(['/contactus']);
  }

  isToday(day: string): boolean {
    const today = new Date().getDay();
    
    if (day === 'monday' || day === 'tuesday' || day === 'wednesday' || day === 'thursday' || day === 'friday') {
      return today >= 1 && today <= 5;
    } else if (day === 'saturday') {
      return today === 6;
    } else if (day === 'sunday') {
      return today === 0;
    }
    
    return false;
  }
}
