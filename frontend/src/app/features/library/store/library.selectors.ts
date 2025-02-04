import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LibraryState } from './library.reducer';

export const selectLibraryState = createFeatureSelector<LibraryState>('library');

export const selectTracks = createSelector(
  selectLibraryState,
  state => state.filteredTracks
);

export const selectLoading = createSelector(
  selectLibraryState,
  state => state.loading
);

export const selectError = createSelector(
  selectLibraryState,
  state => state.error
);

export const selectCurrentFilter = createSelector(
  selectLibraryState,
  state => state.currentFilter
);
