import { Routes } from '@angular/router';

import { FavoritesPageComponent, PhotosPageComponent } from "./pages";

export const routes: Routes = [
  { path: '', component: PhotosPageComponent },
  { path: 'favorites', component: FavoritesPageComponent },
  { path: '**', redirectTo: '' }
];
