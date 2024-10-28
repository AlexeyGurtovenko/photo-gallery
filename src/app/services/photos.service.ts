import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { delay, map, Observable } from 'rxjs';

import { Photo, PhotoApiResponse } from '../models';
import { FavoritesService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  // TODO: move to .env file
  private readonly API_URL = 'https://picsum.photos/v2/list';

  private readonly _photos = signal<Map<string, Photo>>(new Map());

  public photos = computed(() => {
    return Array.from(this._photos().values());
  });

  constructor(
    private readonly http: HttpClient,
    private readonly favoritesService: FavoritesService,
  ) {}

  public getPhotos(page: number, limit = 50): Observable<void> {
    // Real world API simulation delay (200-300 ms according to the requirements)
    const randomDelay = Math.floor(Math.random() * 100) + 200;

    return this.http.get<PhotoApiResponse[]>(`${this.API_URL}?page=${page}&limit=${limit}`).pipe(
      map((response) => {
        const newPhotos = this.mapApiResponseToMapEntries(response);
        const updatedPhotos = new Map([...this._photos(), ...newPhotos]);
        this._photos.set(updatedPhotos);
      }),
      delay(randomDelay),
    );
  }

  public toggleFavorite(photo: Photo) {
    photo.isFavorite = !photo.isFavorite;
    this._photos.set(this._photos().set(photo.id, photo));

    if (photo.isFavorite) {
      this.favoritesService.addToFavorites(photo);
    } else {
      this.favoritesService.removeFromFavorites(photo.id);
    }
  }

  private mapApiResponseToMapEntries(data: PhotoApiResponse[]): Map<string, Photo> {
    return data.reduce((acc, { id, author, download_url }) => {
      const photo: Photo = {
        id,
        author,
        download_url,
        isFavorite: this.favoritesService.isFavorite(id),
      };

      return acc.set(id, photo);
    }, new Map<string, Photo>());
  }
}
