import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadAlbums, filterAlbums, sortAlbums } from '../../store/albums.actions';
import { selectAlbums, selectLoading } from '../../store/albums.selectors';

@Component({
  selector: 'app-albums-list',
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6 dark:text-white">Albums</h1>

      <div class="mb-6 flex justify-between items-center">
        <app-search-bar
          (search)="onSearch($event)"
          class="w-64"
        ></app-search-bar>

        <app-filter-bar
          [categories]="categories"
          (filterChange)="onFilterChange($event)"
          (sortChange)="onSortChange($event)"
        ></app-filter-bar>
      </div>

      <ng-container *ngIf="!(loading$ | async); else loadingTpl">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            *ngFor="let album of albums$ | async"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            [routerLink]="['/albums', album.id]"
          >
            <img
              [src]="album.coverUrl"
              [alt]="album.title"
              class="w-full h-48 object-cover"
            >
            <div class="p-4">
              <h3 class="text-lg font-semibold dark:text-white">{{ album.title }}</h3>
              <p class="text-gray-600 dark:text-gray-300">{{ album.artist }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ album.year }} • {{ album.tracks.length }} tracks
              </p>
            </div>
          </div>
        </div>
      </ng-container>

      <ng-template #loadingTpl>
        <div class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </ng-template>
    </div>
  `
})
export class AlbumsListComponent implements OnInit {
  albums$: Observable<any[]>;
  loading$: Observable<boolean>;
  categories: string[] = ['All', 'Rock', 'Pop', 'Jazz', 'Classical', 'Electronic'];

  constructor(private store: Store) {
    this.albums$ = this.store.select(selectAlbums);
    this.loading$ = this.store.select(selectLoading);
  }

  ngOnInit() {
    this.store.dispatch(loadAlbums());
  }

  onSearch(query: string) {
    this.store.dispatch(filterAlbums({ query }));
  }

  onFilterChange(category: string) {
    this.store.dispatch(filterAlbums({ category }));
  }

  onSortChange(sortBy: string) {
    this.store.dispatch(sortAlbums({ sortBy }));
  }
}
