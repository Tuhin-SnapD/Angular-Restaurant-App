import { Component, OnInit, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  showBackToTop = false;
  currentYear = new Date().getFullYear();

  constructor(
    private snackBar: MatSnackBar
  ) { }

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
    // Navigate to reservation page or open modal
    this.snackBar.open('Please contact us directly for reservations.', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  isToday(day: string): boolean {
    const today = new Date().getDay();
    const dayMap: { [key: string]: number } = {
      'sunday': 0,
      'monday': 1,
      'tuesday': 2,
      'wednesday': 3,
      'thursday': 4,
      'friday': 5,
      'saturday': 6
    };
    
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
