import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadTracks, filterTracks, sortTracks } from '../../store/library.actions';
import { selectTracks, selectLoading } from '../../store/library.selectors';

@Component({
  selector: 'app-library',
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6 dark:text-white">My Library</h1>

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
        <app-track-list
          [tracks]="tracks$ | async"
          (trackSelected)="onTrackSelected($event)"
        ></app-track-list>
      </ng-container>

      <ng-template #loadingTpl>
        <div class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </ng-template>
    </div>
  `
})
export class LibraryComponent implements OnInit {
  tracks$: Observable<any[]>;
  loading$: Observable<boolean>;
  categories: string[] = ['All', 'Rock', 'Pop', 'Jazz', 'Classical', 'Electronic'];

  constructor(private store: Store) {
    this.tracks$ = this.store.select(selectTracks);
    this.loading$ = this.store.select(selectLoading);
  }

  ngOnInit() {
    this.store.dispatch(loadTracks());
  }

  onSearch(query: string) {
    this.store.dispatch(filterTracks({ query }));
  }

  onFilterChange(category: string) {
    this.store.dispatch(filterTracks({ category }));
  }

  onSortChange(sortBy: string) {
    this.store.dispatch(sortTracks({ sortBy }));
  }

  onTrackSelected(track: any) {
    // Dispatch action to play track
    this.store.dispatch(setCurrentTrack({ track }));
  }
}
