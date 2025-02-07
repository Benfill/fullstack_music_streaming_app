import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LibraryState } from './library.reducer';

export const selectLibraryState = createFeatureSelector<LibraryState>('library');

export const selectTracks = createSelector(
  selectLibraryState,
  (state: LibraryState) => state.tracks
);

export const selectLoading = createSelector(
  selectLibraryState,
  state => state.loading
);

export const selectError = createSelector(
  selectLibraryState,
  (state: LibraryState) => state.error
);

export const selectFilters = createSelector(
  selectLibraryState,
  state => state.filters
);

export const selectFilteredTracks = createSelector(
  selectTracks,
  selectFilters,
  (tracks, filters) => {
    // Ensure tracks is an array
    const tracksArray = Array.isArray(tracks) ? tracks : [];

    // Return empty array if no tracks
    if (!tracksArray.length) return [];

    let filteredTracks = [...tracksArray];

    // Apply category filter if category is selected
    if (filters?.category && filters.category !== 'All') {
      filteredTracks = filteredTracks.filter(track =>
        track.category === filters.category
      );
    }

    // Apply search filter if search term exists
    if (filters?.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filteredTracks = filteredTracks.filter(track =>
        track.title.toLowerCase().includes(searchLower) ||
        track.artist.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting if sortBy is defined
    if (filters?.sortBy) {
      filteredTracks.sort((a, b) => {
        switch (filters.sortBy) {
          case 'title':
            return a.title.localeCompare(b.title);
          case 'artist':
            return a.artist.localeCompare(b.artist);
          case 'duration':
            return a.duration - b.duration;
          default:
            return 0;
        }
      });
    }

    return filteredTracks;
  }
);
