import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

import { PhotoGridComponent } from '../../components';
import { Photo } from '../../models';
import { FavoritesService } from '../../services';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [MatIcon, PhotoGridComponent],
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesPageComponent {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly router: Router,
  ) {}

  public photos = computed(() => {
    return this.favoritesService.favorites();
  });

  public onPhotoClick(photo: Photo): void {
    this.router.navigate(['/photos', photo.id]);
  }
}
