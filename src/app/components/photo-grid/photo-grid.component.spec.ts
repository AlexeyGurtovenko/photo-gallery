import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Photo } from '../../models';
import { PhotoComponent } from '../photo/photo.component';
import { PhotoGridComponent } from './photo-grid.component';

describe('PhotoGridComponent', () => {
  let component: PhotoGridComponent;
  let fixture: ComponentFixture<PhotoGridComponent>;

  const mockPhotos: Photo[] = [
    { id: '1', author: 'a1', download_url: 'd1', isFavorite: false },
    { id: '2', author: 'a2', download_url: 'd2', isFavorite: false },
    { id: '3', author: 'a3', download_url: 'd3', isFavorite: false },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoGridComponent, PhotoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoGridComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all photos', () => {
    fixture.componentRef.setInput('photos', mockPhotos);
    fixture.detectChanges();

    const photoElements = fixture.debugElement.queryAll(By.css('app-photo'));
    expect(photoElements.length).toBe(mockPhotos.length);
  });

  it('should emit the photoClick event when a photo is clicked', () => {
    fixture.componentRef.setInput('photos', mockPhotos);
    spyOn(component.photoClick, 'emit');
    fixture.detectChanges();

    const firstPhotoElement = fixture.debugElement.query(By.css('app-photo'));
    firstPhotoElement.triggerEventHandler('click', null);

    expect(component.photoClick.emit).toHaveBeenCalledOnceWith(mockPhotos[0]);
  });

  it('should pass the correct photo data to each app-photo component', () => {
    fixture.componentRef.setInput('photos', mockPhotos);
    fixture.detectChanges();

    const photoElements = fixture.debugElement.queryAll(By.directive(PhotoComponent));
    photoElements.forEach((photoElement, index) => {
      expect(photoElement.componentInstance.photo()).toBe(mockPhotos[index]);
    });
  });
});
