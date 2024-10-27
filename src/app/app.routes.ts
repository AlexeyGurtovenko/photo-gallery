import { Routes } from '@angular/router';

import {
  FavoritesPageComponent,
  PhotoDetailsPageComponent,
  PhotosPageComponent
} from './pages';

export const routes: Routes = [
  { path: '', component: PhotosPageComponent },
  { path: 'favorites', component: FavoritesPageComponent },
  { path: 'photos/:id', component: PhotoDetailsPageComponent },
  { path: '**', redirectTo: '' }
];
