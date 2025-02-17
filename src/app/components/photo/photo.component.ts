import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { Photo } from '../../models';

@Component({
  selector: 'app-photo',
  standalone: true,
  imports: [NgOptimizedImage, MatIconButton, MatIcon],
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoComponent {
  public photo = input.required<Photo>();
}
