import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AlbumsState } from './albums.reducer';

export const selectAlbumsState = createFeatureSelector<AlbumsState>('albums');

export const selectAlbums = createSelector(
  selectAlbumsState,
  state => state.filteredAlbums
);

export const selectSearchResults = createSelector(
  selectAlbumsState,
  state => state.searchResults
);

export const selectIsSearching = createSelector(
  selectAlbumsState,
  state => state.searching
);

export const selectCurrentAlbum = createSelector(
  selectAlbumsState,
  state => state.currentAlbum
);

export const selectLoading = createSelector(
  selectAlbumsState,
  state => state.loading
);

export const selectError = createSelector(
  selectAlbumsState,
  state => state.error
);

export const selectCurrentFilter = createSelector(
  selectAlbumsState,
  state => state.currentFilter
);
