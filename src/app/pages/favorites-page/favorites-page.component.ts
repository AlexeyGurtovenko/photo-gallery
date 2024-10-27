import { Component } from '@angular/core';
import { Router } from "@angular/router";

import { MatIcon } from "@angular/material/icon";

import { FavoritesService } from "../../services";
import { Photo } from "../../models";
import { PhotoGridComponent } from "../../components";

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [
    MatIcon,
    PhotoGridComponent
  ],
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.scss'
})
export class FavoritesPageComponent {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly router: Router
  ) {}

  public get photos(): Photo[] {
    return this.favoritesService.getFavorites();
  }

  public onPhotoClick(photo: Photo): void {
    this.router.navigate(['/photos', photo.id]);
  }
}
