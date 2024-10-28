import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, Inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { filter, fromEvent, map, Subject, take, takeUntil } from 'rxjs';

import { PhotoGridComponent } from '../../components';
import { Photo } from '../../models';
import { PhotoService } from '../../services';

@Component({
  selector: 'app-photos-page',
  standalone: true,
  imports: [PhotoGridComponent, MatProgressSpinner],
  templateUrl: './photos-page.component.html',
  styleUrl: './photos-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotosPageComponent implements OnInit, OnDestroy {
  private readonly window: Window | null = null;
  private readonly destroy$ = new Subject<void>();

  private pageNumber = 1;
  // TODO: calculate number of items depending on screen size
  private itemsPerPage = 25;

  public photos = computed(() => {
    return this.photoService.photos();
  });

  public isLoading = signal<boolean>(false);

  constructor(
    private photoService: PhotoService,
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly cdr: ChangeDetectorRef,
  ) {
    this.window = this.document.defaultView;
  }

  public ngOnInit(): void {
    this.loadPhotos();
    this.setupInfiniteScroll();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onPhotoClick(photo: Photo): void {
    this.photoService.toggleFavorite(photo);
  }

  private loadPhotos(): void {
    if (this.isLoading()) {
      return;
    }

    this.isLoading.set(true);

    this.photoService
      .getPhotos(this.pageNumber, this.itemsPerPage)
      .pipe(take(1))
      .subscribe({
        next: (newPhotos) => {
          this.pageNumber++;
          this.isLoading.set(false);
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('Error loading photos:', err);
          this.isLoading.set(false);
          this.cdr.markForCheck();
        },
      });
  }

  private setupInfiniteScroll(): void {
    if (!this.window) {
      return;
    }

    fromEvent(this.window, 'scroll')
      .pipe(
        map(() => this.getScrollPosition()),
        filter((position) => position >= 0.8 && !this.isLoading()),
        takeUntil(this.destroy$),
      )
      .subscribe(() => this.loadPhotos());
  }

  private getScrollPosition(): number {
    const { scrollTop, scrollHeight, clientHeight } = this.document.documentElement;
    return scrollTop / (scrollHeight - clientHeight);
  }
}
