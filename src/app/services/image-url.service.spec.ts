import { TestBed } from '@angular/core/testing';
import { ImageUrlService } from './image-url.service';

describe('ImageUrlService', () => {
  let service: ImageUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return full URL as is', () => {
    const fullUrl = 'http://localhost:8000/images/uthappizza.png';
    const result = service.getImageUrl(fullUrl);
    expect(result).toBe(fullUrl);
  });

  it('should convert relative path to full backend URL', () => {
    const relativePath = '/images/uthappizza.png';
    const expectedUrl = 'http://localhost:8000/images/uthappizza.png';
    const result = service.getImageUrl(relativePath);
    expect(result).toBe(expectedUrl);
  });

  it('should convert filename to full backend URL', () => {
    const filename = 'uthappizza.png';
    const expectedUrl = 'http://localhost:8000/images/uthappizza.png';
    const result = service.getImageUrl(filename);
    expect(result).toBe(expectedUrl);
  });

  it('should handle empty or null URLs', () => {
    expect(service.getImageUrl('')).toBe('');
    expect(service.getImageUrl(null as any)).toBe('');
  });

  it('should convert array of URLs', () => {
    const urls = [
      'uthappizza.png',
      '/images/zucchipakoda.png'
    ];
    const expectedUrls = [
      'http://localhost:8000/images/uthappizza.png',
      'http://localhost:8000/images/zucchipakoda.png'
    ];
    const result = service.getImageUrls(urls);
    expect(result).toEqual(expectedUrls);
  });
}); 