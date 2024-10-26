import {Component, input} from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

import { MatButton } from "@angular/material/button";
import { MatToolbar } from "@angular/material/toolbar";

import { Link } from "../../models";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatButton,
    RouterLink,
    RouterLinkActive,
    MatToolbar
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public links = input<Link[]>([
    {
      title: 'Photos',
      path: ''
    },
    {
      title: 'Favorites',
      path: '/favorites'
    },
  ]);
}
