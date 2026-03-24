import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Link {
  path: string;
  label: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {
  darkMode = false;
  profileDropdownOpen = false;

  links: Link[] = [
    { path: '/', label: 'Home' },
    { path: '/booking', label: 'Workouts' },
    { path: '/points', label: 'Points' },
    { path: '/login', label: 'Login' },
  ];

  dropdownItems = [
    { label: 'My Account', path: '/profile' },
    { label: 'Orders', path: '/profile/orders' },
    { label: 'Favorites', path: '/profile/favorites' },
  ];

  @ViewChild('profileDropdownRef') profileDropdownRef!: ElementRef;

  navBaseClass =
    'flex items-center justify-center text-sm px-4 py-2 w-20 h-10 rounded-full duration-200 cursor-pointer';
  toggleBtnBaseClass = 'relative w-20 h-10 rounded-full duration-300';
  toggleCircleBaseClass =
    'absolute top-0.5 left-0.5 w-9 h-9 rounded-full shadow-md flex items-center justify-center text-sm transition-transform duration-300';
  profileBtnBase =
    'flex items-center justify-between px-2 py-1 w-20 h-10 rounded-full shadow-sm transition-all duration-200';
  profileImgClass = 'absolute top-0.5 left-0.5 rounded-full w-9 h-9';
  profileDropdownBtnClass = 'absolute top-0.2 right-2 text-sm focus:outline-none cursor-pointer';

  navItemClasses = { light: 'text-black', dark: 'text-[#b3b3b3]' };
  toggleBtnClasses = {
    outer: { light: 'bg-gray-100', dark: 'bg-gray-800' },
    circle: { light: 'bg-white text-black', dark: 'bg-gray-900 text-white' },
  };
  profileBtnClasses = {
    button: {
      light: 'bg-gray-100 hover:bg-gray-200 text-black',
      dark: 'bg-gray-800 hover:bg-gray-700 text-white',
    },
    dropdown: { light: 'bg-gray-200 text-black', dark: 'bg-gray-700 text-[#e0e0e0]' },
  };
  logoSrc = { light: '/nav/logo-light.png', dark: '/nav/logo-dark.png' };

  dropdownBase = 'absolute right-0 mt-2 w-38 rounded-lg shadow-lg py-2 z-50';
  dropdownTheme = {
    light: 'bg-gray-200 text-black',
    dark: 'bg-gray-700 text-[#e0e0e0]',
  };
  dropdownItemBase = 'block px-4 py-2 transition cursor-pointer';
  dropdownItemHover = {
    light: 'hover:bg-gray-300',
    dark: 'hover:bg-gray-600',
  };

  dropdownLogoutExtra = 'w-full text-left';

  getClass(classes: { light: string; dark: string }): string {
    return this.darkMode ? classes.dark : classes.light;
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.documentElement.classList.toggle('dark', this.darkMode);
  }

  toggleProfileDropdown(event: Event) {
    event.stopPropagation();
    this.profileDropdownOpen = !this.profileDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (this.profileDropdownRef && !this.profileDropdownRef.nativeElement.contains(event.target)) {
      this.profileDropdownOpen = false;
    }
  }

  logout() {
    console.log('Logging out...');
  }
}
