import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';

import { PhotoComponent } from '../../components';
import { Photo } from '../../models';
import { FavoritesService } from '../../services';

@Component({
  selector: 'app-photo-details-page',
  standalone: true,
  imports: [PhotoComponent, AsyncPipe, MatButton, MatIcon],
  templateUrl: './photo-details-page.component.html',
  styleUrl: './photo-details-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoDetailsPageComponent implements OnInit {
  public photo$: Observable<Photo | null | undefined> = of(null);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly favoritesService: FavoritesService,
  ) {}

  public ngOnInit(): void {
    this.photo$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const photoId = params.get('id');
        const photo = photoId ? this.favoritesService.getById(photoId) : null;
        return of(photo);
      }),
    );
  }

  public removeFromFavorites(photoId: string): void {
    this.favoritesService.removeFromFavorites(photoId);
    this.router.navigate(['/favorites']);
  }
}
