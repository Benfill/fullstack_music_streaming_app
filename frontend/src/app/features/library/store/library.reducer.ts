import { createReducer, on } from '@ngrx/store';
import * as LibraryActions from './library.actions';

export interface LibraryState {
  tracks: any[];
  filteredTracks: any[];
  loading: boolean;
  error: any | null;
  currentFilter: {
    query?: string;
    category?: string;
    sortBy?: string;
  };
}

export const initialState: LibraryState = {
  tracks: [],
  filteredTracks: [],
  loading: false,
  error: null,
  currentFilter: {}
};

export const libraryReducer = createReducer(
  initialState,

  on(LibraryActions.loadTracks, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(LibraryActions.loadTracksSuccess, (state, { tracks }) => ({
    ...state,
    tracks,
    filteredTracks: tracks,
    loading: false
  })),

  on(LibraryActions.loadTracksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(LibraryActions.filterTracks, (state, { query, category }) => {
    const currentFilter = { ...state.currentFilter, query, category };
    const filteredTracks = applyFilters(state.tracks, currentFilter);
    return {
      ...state,
      currentFilter,
      filteredTracks
    };
  }),

  on(LibraryActions.sortTracks, (state, { sortBy }) => {
    const currentFilter = { ...state.currentFilter, sortBy };
    const filteredTracks = applyFilters(state.tracks, currentFilter);
    return {
      ...state,
      currentFilter,
      filteredTracks
    };
  })
);

function applyFilters(tracks: any[], filter: any) {
  let result = [...tracks];

  if (filter.query) {
    const query = filter.query.toLowerCase();
    result = result.filter(track =>
      track.title.toLowerCase().includes(query) ||
      track.artist.toLowerCase().includes(query) ||
      track.album.toLowerCase().includes(query)
    );
  }

  if (filter.category && filter.category !== 'All') {
    result = result.filter(track => track.category === filter.category);
  }

  if (filter.sortBy) {
    result = result.sort((a, b) => {
      switch (filter.sortBy) {
        case 'name':
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

  return result;
}
