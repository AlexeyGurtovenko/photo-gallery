import { Component, EventEmitter, input, Output } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";

import { MatIcon } from "@angular/material/icon";
import { MatIconButton } from "@angular/material/button";

import { Photo }  from "../../models";
import { FavoritesService } from "../../services";

@Component({
  selector: 'app-photo-grid',
  standalone: true,
  templateUrl: './photo-grid.component.html',
  imports: [
    MatIcon,
    MatIconButton,
    NgOptimizedImage
  ],
  styleUrl: './photo-grid.component.scss'
})
export class PhotoGridComponent {
  public photos = input<Photo[]>([]);

  @Output()
  public photoClick = new EventEmitter<Photo>();

  constructor(private readonly favoriteService: FavoritesService) {}

  public onPhotoClick(photo: Photo): void {
    this.photoClick.emit(photo);
  }

  public isFavorite(photoId: string): boolean {
    return this.favoriteService.isFavorite(photoId);
  }
}
