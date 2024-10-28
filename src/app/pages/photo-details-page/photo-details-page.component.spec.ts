import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { PhotoComponent } from '../../components';
import { Photo } from '../../models';
import { FavoritesService, PhotoService } from '../../services';
import { PhotoDetailsPageComponent } from './photo-details-page.component';

describe('PhotoDetailsPageComponent', () => {
  let component: PhotoDetailsPageComponent;
  let fixture: ComponentFixture<PhotoDetailsPageComponent>;
  let mockFavoritesService: jasmine.SpyObj<FavoritesService>;
  let mockPhotoService: jasmine.SpyObj<PhotoService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: ActivatedRoute;

  beforeEach(async () => {
    mockFavoritesService = jasmine.createSpyObj('FavoritesService', ['getById']);
    mockPhotoService = jasmine.createSpyObj('PhotoService', ['toggleFavorite']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = {
      paramMap: of({
        get: () => '123',
      }),
    } as unknown as ActivatedRoute;

    await TestBed.configureTestingModule({
      imports: [PhotoComponent, PhotoDetailsPageComponent, MatButtonModule, MatIconModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: FavoritesService, useValue: mockFavoritesService },
        { provide: PhotoService, useValue: mockPhotoService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoDetailsPageComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize and set photo$ correctly', fakeAsync(() => {
    const photoMock: Photo = { id: '123', author: 'dasd', download_url: 'asdas', isFavorite: false };
    mockFavoritesService.getById.and.returnValue(photoMock);

    fixture.detectChanges();
    tick();

    component.photo$.subscribe((photo) => {
      expect(photo).toEqual(photoMock);
    });
  }));

  it('should render the photo component when photo$ has a value', fakeAsync(() => {
    const photoMock: Photo = { id: '123', author: 'dasd', download_url: 'asdas', isFavorite: false };
    mockFavoritesService.getById.and.returnValue(photoMock);

    fixture.detectChanges();
    tick();

    const photoElement = fixture.debugElement.query(By.css('app-photo'));
    expect(photoElement).toBeTruthy();
    expect(photoElement.componentInstance.photo()).toEqual(photoMock);
  }));
});
