import { Routes } from '@angular/router';

import { PhotosPageComponent } from "./pages";

export const routes: Routes = [
  { path: '', component: PhotosPageComponent },
  { path: '**', redirectTo: '' }
];
