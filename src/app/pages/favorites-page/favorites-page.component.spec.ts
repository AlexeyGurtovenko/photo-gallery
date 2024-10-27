import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { FavoritesPageComponent } from './favorites-page.component';
import { FavoritesService } from '../../services';
import { PhotoGridComponent } from '../../components';
import { Photo } from '../../models';
import { By } from '@angular/platform-browser';

describe('FavoritesPageComponent', () => {
  let component: FavoritesPageComponent;
  let fixture: ComponentFixture<FavoritesPageComponent>;
  let favoritesServiceSpy: jasmine.SpyObj<FavoritesService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockPhotos: Photo[] = [
    { id: '1', author: 'Author 1', download_url: 'url1', url: '', height: 11, width: 22 },
    { id: '2', author: 'Author 2', download_url: 'url2', url: '', height: 33, width: 44 },
  ];

  beforeEach(async () => {
    const favoritesServiceMock = jasmine.createSpyObj('FavoritesService', ['getFavorites', 'isFavorite']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [FavoritesPageComponent, MatIcon, PhotoGridComponent],
      providers: [
        { provide: FavoritesService, useValue: favoritesServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    favoritesServiceSpy = TestBed.inject(FavoritesService) as jasmine.SpyObj<FavoritesService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture = TestBed.createComponent(FavoritesPageComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display "No favorites yet" message when there are no favorite photos', () => {
    favoritesServiceSpy.getFavorites.and.returnValue([]);
    fixture.detectChanges();

    const emptyStateElement = fixture.debugElement.query(By.css('.empty-state'));
    const photoGridElement = fixture.debugElement.query(By.directive(PhotoGridComponent));

    expect(emptyStateElement).toBeTruthy();
    expect(emptyStateElement.nativeElement.textContent).toContain('No favorites yet');
    expect(photoGridElement).toBeNull();
  });

  it('should display photo grid when there are favorite photos', () => {
    favoritesServiceSpy.getFavorites.and.returnValue(mockPhotos);
    fixture.detectChanges();

    const emptyStateElement = fixture.debugElement.query(By.css('.empty-state'));
    const photoGridElement = fixture.debugElement.query(By.directive(PhotoGridComponent));

    expect(emptyStateElement).toBeNull();
    expect(photoGridElement).toBeTruthy();
    expect(photoGridElement.componentInstance.photos()).toEqual(mockPhotos);
  });

  it('should navigate to photo details page on photo click', () => {
    const testPhoto: Photo = { id: '1', author: 'Author 1', download_url: 'url1', url: '', height: 44, width: 55 };
    component.onPhotoClick(testPhoto);

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/photos', testPhoto.id]);
  });
});
