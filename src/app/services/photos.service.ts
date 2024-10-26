import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, delay } from 'rxjs';

import { Photo } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  // TODO: move to .env file
  private readonly API_URL = 'https://picsum.photos/v2/list';

  constructor(
    private readonly http: HttpClient,
  ) {}

  public getPhotos(page: number, limit = 10): Observable<Photo[]> {
    // real world API simulation delay
    const randomDelay = Math.floor(Math.random() * 100) + 200;

    return this.http.get<Photo[]>(`${this.API_URL}?page=${page}&limit=${limit}`)
      .pipe(delay(randomDelay));
  }

  public getPhotoById(id: string): Observable<Photo> {
    return this.http.get<Photo>(`${this.API_URL}/id/${id}`);
  }
}
