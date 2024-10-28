import { NgOptimizedImage } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';

import { Photo } from '../../models';
import { PhotoComponent } from './photo.component';

describe('PhotoComponent', () => {
  let fixture: ComponentFixture<PhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoComponent, MatIconModule, MatButtonModule, NgOptimizedImage],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoComponent);
  });

  it('should display the photo image with correct src and alt attributes', () => {
    const testPhoto: Photo = { id: '123', author: 'John Doe', download_url: 'https://example.com/photo.jpg', isFavorite: false };
    fixture.componentRef.setInput('photo', testPhoto);
    fixture.detectChanges();

    const imgElement = fixture.debugElement.query(By.css('img'));
    expect(imgElement.attributes['src']).toBe(testPhoto.download_url);
    expect(imgElement.attributes['alt']).toBe(`Photo by ${testPhoto.author}`);
  });

  it('should display the author name', () => {
    const testPhoto: Photo = { id: '123', author: 'John Doe', download_url: 'https://example.com/photo.jpg', isFavorite: false };
    fixture.componentRef.setInput('photo', testPhoto);
    fixture.detectChanges();

    const authorElement = fixture.debugElement.query(By.css('.author')).nativeElement;
    expect(authorElement.textContent).toContain(testPhoto.author);
  });

  it('should display the favorite button when photo is a favorite', () => {
    const testPhoto: Photo = { id: '123', author: 'John Doe', download_url: 'https://example.com/photo.jpg', isFavorite: true };
    fixture.componentRef.setInput('photo', testPhoto);
    fixture.detectChanges();

    const favoriteButton = fixture.debugElement.query(By.css('button[aria-label="Toggle favorite"]'));
    expect(favoriteButton).toBeTruthy();
    expect(favoriteButton.attributes['aria-pressed']).toBe('true');
  });

  it('should not display the favorite button when photo is not a favorite', () => {
    const testPhoto: Photo = { id: '123', author: 'John Doe', download_url: 'https://example.com/photo.jpg', isFavorite: false };
    fixture.componentRef.setInput('photo', testPhoto);
    fixture.detectChanges();

    const favoriteButton = fixture.debugElement.query(By.css('button[aria-label="Toggle favorite"]'));
    expect(favoriteButton).toBeNull();
  });
});
