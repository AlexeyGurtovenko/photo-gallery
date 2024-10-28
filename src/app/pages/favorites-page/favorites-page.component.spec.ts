import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { PhotoGridComponent } from '../../components';
import { Photo } from '../../models';
import { FavoritesService } from '../../services';
import { FavoritesPageComponent } from './favorites-page.component';

describe('FavoritesPageComponent', () => {
  let fixture: ComponentFixture<FavoritesPageComponent>;
  let mockFavoritesService: jasmine.SpyObj<FavoritesService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockFavoritesService = jasmine.createSpyObj('FavoritesService', ['favorites']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [MatIconModule, FavoritesPageComponent, PhotoGridComponent],
      providers: [
        { provide: FavoritesService, useValue: mockFavoritesService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesPageComponent);
    component = fixture.componentInstance;
  });

  it('should display empty state if there are no favorite photos', () => {
    // Arrange
    mockFavoritesService.favorites.and.returnValue([]);

    // Act
    fixture.detectChanges();
    const emptyState = fixture.debugElement.query(By.css('.empty-state'));
    const photoGrid = fixture.debugElement.query(By.css('app-photo-grid'));

    // Assert
    expect(emptyState).toBeTruthy();
    expect(photoGrid).toBeFalsy();
  });

  it('should display the photo grid if there are favorite photos', () => {
    // Arrange
    const photosMock: Photo[] = [
      { id: '1', author: 'a1', download_url: 'd1', isFavorite: false },
      { id: '2', author: 'a2', download_url: 'd2', isFavorite: false },
    ];
    mockFavoritesService.favorites.and.returnValue(photosMock);

    // Act
    fixture.detectChanges();
    const emptyState = fixture.debugElement.query(By.css('.empty-state'));
    const photoGrid = fixture.debugElement.query(By.css('app-photo-grid'));

    // Assert
    expect(emptyState).toBeFalsy();
    expect(photoGrid).toBeTruthy();
    expect(photoGrid.componentInstance.photos()).toEqual(photosMock);
  });

  it('should navigate to the photo details page when a photo is clicked', () => {
    // Arrange
    const photosMock: Photo[] = [{ id: '1', author: 'a1', download_url: 'd1', isFavorite: false }];
    mockFavoritesService.favorites.and.returnValue(photosMock);
    fixture.detectChanges();

    const photoGrid = fixture.debugElement.query(By.css('app-photo-grid'));
    const photo = photosMock[0];

    // Act
    photoGrid.triggerEventHandler('photoClick', photo);

    // Assert
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/photos', photo.id]);
  });
});
