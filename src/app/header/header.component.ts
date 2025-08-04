import { Component, OnInit } from '@angular/core';
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
  hasNewNotifications = true; // You can make this dynamic based on your business logic

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.handleScroll();
  }

  handleScroll(): void {
    window.addEventListener('scroll', () => {
      const toolbar = document.querySelector('.main-toolbar') as HTMLElement;
      if (toolbar) {
        if (window.scrollY > 50) {
          toolbar.classList.add('scrolled');
        } else {
          toolbar.classList.remove('scrolled');
        }
      }
    });
  }

  toggleSearch(): void {
    this.searchActive = !this.searchActive;
    if (this.searchActive) {
      // Focus on search input after a short delay
      setTimeout(() => {
        const searchInput = document.querySelector('.search-field input') as HTMLInputElement;
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

  performSearch(): void {
    if (this.searchQuery.trim()) {
      // Navigate to menu page with search query
      this.router.navigate(['/menu'], { queryParams: { search: this.searchQuery } });
      this.searchActive = false;
      this.searchQuery = '';
    }
  }

  openReservations(): void {
    // You can implement reservation logic here
    // For now, we'll just show a message
    alert('Please contact us directly to make a reservation.');
  }

  callPhone(): void {
    // Open phone dialer - replace with actual phone number
    alert('Please contact us for our phone number.');
  }

  // Close mobile menu when clicking outside
  onMobileMenuClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.toggleMobileMenu();
    }
  }
}
