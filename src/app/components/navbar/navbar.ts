import { Component } from '@angular/core';
import { MenuItem } from '../../types';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
})
export class NavbarComponent {

  // Variables
  protected readonly menu: MenuItem[] = [
    {
      id: 0,
      title: 'Home',
      routerLink: ''
    },
    {
      id: 1,
      title: 'Tasks',
      routerLink: 'tasks'
    }
  ]
}
