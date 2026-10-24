import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchActive = false;
  mobileMenuActive = false;
  searchQuery = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.handleScroll();
  }

  @HostListener('window:scroll')
  handleScroll(): void {
    const toolbar = document.querySelector('.ng-toolbar') as HTMLElement;
    if (toolbar) {
      toolbar.classList.toggle('scrolled', window.scrollY > 50);
    }
  }

  toggleSearch(): void {
    this.searchActive = !this.searchActive;
    if (this.searchActive) {
      // Focus on search input after a short delay
      setTimeout(() => {
        const searchInput = document.querySelector('.ng-search-panel input') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }, 100);
    } else {
      this.searchQuery = '';
    }
  }

  toggleMobileMenu(): void {
    this.mobileMenuActive = !this.mobileMenuActive;
    // Prevent body scroll when mobile menu is open
    if (this.mobileMenuActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileMenu(): void {
    this.mobileMenuActive = false;
    document.body.style.overflow = '';
  }

  performSearch(): void {
    const query = this.searchQuery.trim();
    if (query) {
      this.router.navigate(['/menu'], { queryParams: { search: query } });
      this.searchActive = false;
      this.searchQuery = '';
    }
  }

  openReservations(): void {
    this.mobileMenuActive = false;
    document.body.style.overflow = '';
    this.router.navigate(['/contactus']);
  }

  callPhone(): void {
    window.location.href = 'tel:+85212345678';
  }

  // Close mobile menu when clicking outside
  onMobileMenuClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.toggleMobileMenu();
    }
  }
}
