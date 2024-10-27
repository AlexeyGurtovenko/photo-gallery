import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { PhotoDetailsPageComponent } from './photo-details-page.component';
import { FavoritesService } from '../../services';
import { PhotoComponent } from '../../components';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Photo } from '../../models';

describe('PhotoDetailsPageComponent', () => {
  let component: PhotoDetailsPageComponent;
  let fixture: ComponentFixture<PhotoDetailsPageComponent>;
  let favoritesServiceSpy: jasmine.SpyObj<FavoritesService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockPhoto: Photo = {
    id: '1',
    download_url: 'https://example.com/photo.jpg',
    author: 'John Doe',
    url: '',
    width: 44,
    height: 55,
  };

  beforeEach(async () => {
    const favoritesServiceMock = jasmine.createSpyObj('FavoritesService', ['getById', 'removeFromFavorites']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [PhotoDetailsPageComponent, PhotoComponent, MatButton, MatIcon],
      providers: [
        { provide: FavoritesService, useValue: favoritesServiceMock },
        { provide: Router, useValue: routerMock },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: (key: string) => (key === 'id' ? mockPhoto.id : null) }),
          },
        },
      ],
    }).compileComponents();

    favoritesServiceSpy = TestBed.inject(FavoritesService) as jasmine.SpyObj<FavoritesService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    favoritesServiceSpy.getById.and.returnValue(mockPhoto);
    fixture = TestBed.createComponent(PhotoDetailsPageComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should populate photo$ with the correct photo based on route parameter', (done) => {
    component.ngOnInit();
    component.photo$.subscribe((photo) => {
      expect(photo).toEqual(mockPhoto);
      expect(favoritesServiceSpy.getById).toHaveBeenCalledWith(mockPhoto.id);
      done();
    });
  });

  it('should call removeFromFavorites and navigate to /favorites', () => {
    component.removeFromFavorites(mockPhoto.id);
    expect(favoritesServiceSpy.removeFromFavorites).toHaveBeenCalledWith(mockPhoto.id);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/favorites']);
  });
});
