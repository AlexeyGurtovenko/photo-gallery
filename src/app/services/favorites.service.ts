import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Photo } from '../models';

import { LocalStorageService } from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly STORAGE_KEY = 'favorites';
  private readonly favorites: Map<string, Photo>;

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly localStorage: LocalStorageService
  ) {
    this.favorites = new Map(Object.entries(this.loadFavorites()));
  }

  public addToFavorites(photo: Photo): void {
    this.favorites.set(photo.id, photo);
    this.saveFavorites();
    this.snackBar.open('Added to favorites', 'Close', { duration: 2000 });
  }

  public removeFromFavorites(photoId: string): void {
    this.favorites.delete(photoId);
    this.saveFavorites();
    this.snackBar.open('Removed from favorites', 'Close', { duration: 2000 });
  }

  public getFavorites(): Photo[] {
    return Array.from(this.favorites.values());
  }

  public isFavorite(photoId: string): boolean {
    return this.favorites.has(photoId);
  }

  public getById(photoId: string): Photo | undefined {
    return this.favorites.get(photoId);
  }

  private saveFavorites(): void {
    const stringifiedData = JSON.stringify(Object.fromEntries(this.favorites));
    this.localStorage.saveData(this.STORAGE_KEY, stringifiedData)
  }

  private loadFavorites(): Record<string, Photo> {
    const stored = this.localStorage.getData(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  }
}
