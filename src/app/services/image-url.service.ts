import { Injectable } from '@angular/core';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class ImageUrlService {

  constructor() { }

  /**
   * Ensures image URLs are properly formatted for backend
   * @param imageUrl - The image URL from backend (e.g., "http://localhost:8000/images/dish.jpg")
   * @returns Properly formatted backend image URL
   */
  getImageUrl(imageUrl: string): string {
    if (!imageUrl) {
      return '';
    }

    // If it's already a full URL, return as is
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }

    // If it's a relative path, convert to full backend URL
    if (imageUrl.startsWith('/')) {
      return `${baseURL}${imageUrl.substring(1)}`;
    }

    // If it's just a filename, add the backend URL
    return `${baseURL}images/${imageUrl}`;
  }

  /**
   * Converts an array of image URLs to backend URLs
   * @param imageUrls - Array of image URLs
   * @returns Array of backend image URLs
   */
  getImageUrls(imageUrls: string[]): string[] {
    return imageUrls.map(url => this.getImageUrl(url));
  }
} 