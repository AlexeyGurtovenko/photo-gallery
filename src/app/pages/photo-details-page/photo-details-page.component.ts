import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AsyncPipe } from "@angular/common";

import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

import { Observable, of, switchMap } from "rxjs";

import { FavoritesService } from "../../services";
import { Photo } from "../../models";
import { PhotoComponent } from "../../components";

@Component({
  selector: 'app-photo-details-page',
  standalone: true,
  imports: [
    PhotoComponent,
    AsyncPipe,
    MatButton,
    MatIcon
  ],
  templateUrl: './photo-details-page.component.html',
  styleUrl: './photo-details-page.component.scss'
})
export class PhotoDetailsPageComponent implements OnInit {
  protected photo$: Observable<Photo | null | undefined> = of(null);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly favoritesService: FavoritesService
  ) {}

  public ngOnInit(): void {
    this.photo$ = this.route.paramMap.pipe(
      switchMap(params => {
        const photoId = params.get('id');
        const photo = photoId ? this.favoritesService.getById(photoId) : null;
        return of(photo);
      })
    );
  }

  protected removeFromFavorites(photoId: string): void {
    this.favoritesService.removeFromFavorites(photoId);
  }
}
