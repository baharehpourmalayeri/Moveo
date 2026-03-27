import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavLinks } from './nav-links/nav-links';
import { ProfileMenu } from './profile-menu/profile-menu';
import { ToggleDarkMode } from './toggle/toggle';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, NavLinks, ProfileMenu, ToggleDarkMode],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {
  darkMode = false;

  links = [
    { path: '/', label: 'Home' },
    { path: '/workouts', label: 'Workouts' },
    { path: '/points', label: 'Points' },
    { path: '/login', label: 'Login' },
  ];

  dropdownItems = [
    { label: 'My Account', path: '/profile' },
    { label: 'Orders', path: '/profile/orders' },
    { label: 'Favorites', path: '/profile/favorites' },
  ];

  onToggleDarkMode(value: boolean) {
    this.darkMode = value;
    document.documentElement.classList.toggle('dark', this.darkMode);
  }

  logout() {
    console.log('Logging out...');
  }
}
