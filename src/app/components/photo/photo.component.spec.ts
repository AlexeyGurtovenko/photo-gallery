import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { PhotoComponent } from './photo.component';
import { NgOptimizedImage } from '@angular/common';

describe('PhotoComponent', () => {
  let component: PhotoComponent;
  let fixture: ComponentFixture<PhotoComponent>;

  const mockPhoto = {
    id: '1',
    download_url: 'https://example.com/photo.jpg',
    author: 'John Doe',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgOptimizedImage, MatIconModule, PhotoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('photo', mockPhoto);
    fixture.componentRef.setInput('isFavorite', true);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the image with correct src and alt attributes', () => {
    const img = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(img.src).toContain(mockPhoto.download_url);
    expect(img.alt).toBe(`Photo by ${mockPhoto.author}`);
  });

  it('should display the author’s name', () => {
    const authorSpan = fixture.debugElement.query(By.css('.author')).nativeElement;
    expect(authorSpan.textContent).toContain(`By ${mockPhoto.author}`);
  });

  it('should apply "favorite" class when isFavorite is true', () => {
    const photoItem = fixture.debugElement.query(By.css('.photo-item')).nativeElement;
    expect(photoItem.classList).toContain('favorite');
  });

  it('should not apply "favorite" class when isFavorite is false', () => {
    fixture.componentRef.setInput('isFavorite', false);
    fixture.detectChanges();

    const photoItem = fixture.debugElement.query(By.css('.photo-item')).nativeElement;
    expect(photoItem.classList).not.toContain('favorite');
  });

  it('should display "favorite" icon when isFavorite is true', () => {
    fixture.componentRef.setInput('isFavorite', true);
    fixture.detectChanges();

    const icon = fixture.debugElement.query(By.css('mat-icon')).nativeElement;
    expect(icon.textContent.trim()).toBe('favorite');
  });

  it('should display "favorite_border" icon when isFavorite is false', () => {
    fixture.componentRef.setInput('isFavorite', false);
    fixture.detectChanges();

    const icon = fixture.debugElement.query(By.css('mat-icon')).nativeElement;
    expect(icon.textContent.trim()).toBe('favorite_border');
  });
});
