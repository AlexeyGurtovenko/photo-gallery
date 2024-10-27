import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { Link } from '../../models';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButton, RouterLink, RouterLinkActive, MatToolbar, MatIcon],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public links = input<Link[]>([
    {
      title: 'Photos',
      relativePath: '',
      iconName: 'photo_library',
    },
    {
      title: 'Favorites',
      relativePath: '/favorites',
      iconName: 'favorite',
    },
  ]);
}
