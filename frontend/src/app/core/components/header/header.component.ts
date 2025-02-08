import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from '../../../features/auth/store/auth.actions';

@Component({
  selector: 'app-header',
  template: `
    <header class="bg-white shadow-md dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <!-- Logo/Brand -->
          <div class="flex items-center">
            <a routerLink="/" class="text-xl font-bold text-gray-800 dark:text-white">
            Musify
            </a>
          </div>

          <!-- Navigation -->
          <nav class="flex items-center space-x-4">
            <a
              routerLink="/library"
              routerLinkActive="text-blue-500"
              class="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
            >
              Library
            </a>
            <a
              routerLink="/albums"
              routerLinkActive="text-blue-500"
              class="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
            >
              Albums
            </a>
          </nav>

          <!-- User Menu -->
          <div class="flex items-center">
            <button
              (click)="onLogout()"
              class="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {
  constructor(private store: Store) {}

  onLogout() {
    this.store.dispatch(logout());
  }
}
