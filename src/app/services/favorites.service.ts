import { computed, Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { LocalStorageService } from './local-storage.service';
import { Photo } from '../models';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private readonly STORAGE_KEY = 'favorites';
  private readonly _favorites = signal<Map<string, Photo>>(new Map(Object.entries(this.loadFavorites())));

  public favorites = computed(() => {
    return Array.from(this._favorites().values());
  });

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly localStorage: LocalStorageService,
  ) {}

  public addToFavorites(photo: Photo): void {
    const currentFavorites = this._favorites();
    currentFavorites.set(photo.id, photo);
    this._favorites.set(new Map(currentFavorites));
    this.saveFavorites();
    this.snackBar.open('Added to favorites', 'Close', { duration: 2000 });
  }

  public removeFromFavorites(photoId: string): void {
    const currentFavorites = this._favorites();
    currentFavorites.delete(photoId);
    this._favorites.set(new Map(currentFavorites));
    this.saveFavorites();
    this.snackBar.open('Removed from favorites', 'Close', { duration: 2000 });
  }

  public isFavorite(photoId: string): boolean {
    return this._favorites().has(photoId);
  }

  public getById(photoId: string): Photo | undefined {
    return this._favorites().get(photoId);
  }

  private saveFavorites(): void {
    const stringifiedData = JSON.stringify(Object.fromEntries(this._favorites().entries()));
    this.localStorage.saveData(this.STORAGE_KEY, stringifiedData);
  }

  private loadFavorites(): Record<string, Photo> {
    const stored = this.localStorage.getData(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  }
}
