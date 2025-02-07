import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as LibrarySelectors from '../../store/library.selectors';
import * as PlayerActions from '../../../../store/player/player.actions';
import * as LibraryActions from '../../store/library.actions';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  tracks$: Observable<any[]>;
  loading$: Observable<boolean>;
  categories = ['All', 'Rock', 'Pop'];

  constructor(private store: Store) {
    this.tracks$ = this.store.select(LibrarySelectors.selectFilteredTracks);
    this.loading$ = this.store.select(LibrarySelectors.selectLoading);
  }

  ngOnInit() {
    this.store.dispatch(LibraryActions.loadTracks());
  }

  onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.store.dispatch(LibraryActions.setLibraryFilters({ searchTerm }));
  }

  onFilterChange(event: Event) {
    const category = (event.target as HTMLSelectElement).value;
    this.store.dispatch(LibraryActions.setLibraryFilters({ category }));
  }

  onSortChange(event: Event) {
    const sortBy = (event.target as HTMLSelectElement).value;
    this.store.dispatch(LibraryActions.setLibraryFilters({ sortBy }));
  }

  onTrackSelected(track: any) {
    this.store.dispatch(PlayerActions.playTrack({ track }));
  }
}
