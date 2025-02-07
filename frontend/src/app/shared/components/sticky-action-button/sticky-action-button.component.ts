import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sticky-action-button',
  template: `
    <div class="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg z-50">
      <div class="max-w-7xl mx-auto">
        <button
          (click)="onCreate()"
          class="w-full px-4 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
          Create New
        </button>
      </div>
    </div>
  `
})
export class StickyActionButtonComponent {
  constructor(private router: Router) {}

  onCreate() {
    // Get the current route to determine if we're in albums or songs section
    const currentUrl = this.router.url;
    if (currentUrl.includes('albums')) {
      this.router.navigate(['/albums/new']);
    } else if (currentUrl.includes('songs')) {
      this.router.navigate(['/songs/new']);
    }
  }
}
