import { createReducer, on } from '@ngrx/store';
import * as LibraryActions from './library.actions';

export interface LibraryState {
  tracks: {
    id: string;
    title: string;
    artist: string;
    duration: number;
    url: string;
    category: string;
    albumCover?: string;
    album: string;
  }[];
  loading: boolean;
  error: any;
  filters: {
    searchTerm: string;
    category: string;
    sortBy: string;
  };
}

export const initialState: LibraryState = {
  tracks: [],
  loading: false,
  error: null,
  filters: {
    searchTerm: '',
    category: 'All',
    sortBy: 'title'
  }
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
    loading: false,
    tracks,
    error: null
  })),
  on(LibraryActions.loadTracksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    tracks: [],
    error
  })),
  on(LibraryActions.setLibraryFilters, (state, { searchTerm, category, sortBy }) => ({
    ...state,
    filters: {
      ...state.filters,
      ...(searchTerm !== undefined && { searchTerm }),
      ...(category !== undefined && { category }),
      ...(sortBy !== undefined && { sortBy })
    }
  }))
);
