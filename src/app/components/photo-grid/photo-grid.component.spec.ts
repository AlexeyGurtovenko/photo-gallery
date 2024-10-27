import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PhotoGridComponent } from './photo-grid.component';
import { PhotoComponent } from '../photo/photo.component';
import { FavoritesService } from '../../services';
import { Photo } from '../../models';

describe('PhotoGridComponent', () => {
  let component: PhotoGridComponent;
  let fixture: ComponentFixture<PhotoGridComponent>;
  let favoritesServiceSpy: jasmine.SpyObj<FavoritesService>;

  const mockPhotos: Photo[] = [
    { id: '1', download_url: 'https://example.com/photo1.jpg', author: 'John Doe', url: '', height: 44, width: 55 },
    { id: '2', download_url: 'https://example.com/photo2.jpg', author: 'Jane Doe', url: '', height: 66, width: 77 },
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('FavoritesService', ['isFavorite']);

    await TestBed.configureTestingModule({
      imports: [PhotoGridComponent, PhotoComponent],
      providers: [{ provide: FavoritesService, useValue: spy }],
    }).compileComponents();

    favoritesServiceSpy = TestBed.inject(FavoritesService) as jasmine.SpyObj<FavoritesService>;
    favoritesServiceSpy.isFavorite.and.returnValue(true);

    fixture = TestBed.createComponent(PhotoGridComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('photos', mockPhotos);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct number of photos', () => {
    const photoElements = fixture.debugElement.queryAll(By.directive(PhotoComponent));
    expect(photoElements.length).toBe(mockPhotos.length);
  });

  it('should call isFavorite with correct photo id', () => {
    mockPhotos.forEach((photo) => {
      expect(favoritesServiceSpy.isFavorite).toHaveBeenCalledWith(photo.id);
    });
  });

  it('should emit photoClick event when a photo is clicked', () => {
    spyOn(component.photoClick, 'emit');

    const photoComponent = fixture.debugElement.query(By.directive(PhotoComponent));
    photoComponent.triggerEventHandler('click', null);

    expect(component.photoClick.emit).toHaveBeenCalledWith(mockPhotos[0]);
  });
});
