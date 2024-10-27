import { Component, input } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";

import { Photo } from "../../models";

@Component({
  selector: 'app-photo',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.scss'
})
export class PhotoComponent {
  public photo = input.required<Photo>();
}
