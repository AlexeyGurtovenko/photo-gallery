import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Photo library | Photos',
    loadComponent: () => import('./pages/photos-page/photos-page.component').then((m) => m.PhotosPageComponent),
  },
  {
    path: 'favorites',
    title: 'Photo library | Favorites',
    loadComponent: () => import('./pages/favorites-page/favorites-page.component').then((m) => m.FavoritesPageComponent),
  },
  {
    path: 'photos/:id',
    title: 'Photo library | Photo details',
    loadComponent: () => import('./pages/photo-details-page/photo-details-page.component').then((m) => m.PhotoDetailsPageComponent),
  },
  { path: '**', redirectTo: '' },
];
