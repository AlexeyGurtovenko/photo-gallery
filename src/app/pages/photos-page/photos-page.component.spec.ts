import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotosPageComponent } from './photos-page.component';
import { PhotoGridComponent } from '../../components';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { PhotoService, FavoritesService } from '../../services';
import { DOCUMENT } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PhotosPageComponent', () => {
  let component: PhotosPageComponent;
  let fixture: ComponentFixture<PhotosPageComponent>;

  beforeEach(async () => {
    const photoServiceMock = jasmine.createSpyObj('PhotoService', ['getPhotos']);
    const favoriteServiceMock = jasmine.createSpyObj('FavoritesService', ['isFavorite', 'addToFavorites', 'removeFromFavorites']);

    await TestBed.configureTestingModule({
      imports: [PhotosPageComponent, PhotoGridComponent, MatProgressSpinner, HttpClientTestingModule],
      providers: [
        { provide: PhotoService, useValue: photoServiceMock },
        { provide: FavoritesService, useValue: favoriteServiceMock },
        { provide: DOCUMENT, useValue: document },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotosPageComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
