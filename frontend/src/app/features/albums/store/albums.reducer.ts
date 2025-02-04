import { createReducer, on } from '@ngrx/store';
import * as AlbumsActions from './albums.actions';
import { Album, ApiError } from '../models/album.model';

export interface AlbumsState {
  albums: Album[];
  filteredAlbums: Album[];
  currentAlbum: Album | null;
  loading: boolean;
  error: ApiError | null;
  currentFilter: {
    query?: string;
    category?: string;
    sortBy?: 'name' | 'artist' | 'year';
    pageSize?: number;
    pageIndex?: number;
  };
  pagination: {
    total: number;
    pageSize: number;
    pageIndex: number;
  };
}

export const initialState: AlbumsState = {
  albums: [],
  filteredAlbums: [],
  currentAlbum: null,
  loading: false,
  error: null,
  currentFilter: {},
  pagination: {
    total: 0,
    pageSize: 20,
    pageIndex: 0
  }
};

export const albumsReducer = createReducer(
  initialState,

  on(AlbumsActions.loadAlbums, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(AlbumsActions.loadAlbumsSuccess, (state, { albums }) => ({
    ...state,
    albums,
    filteredAlbums: albums,
    loading: false
  })),

  on(AlbumsActions.loadAlbumsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(AlbumsActions.loadAlbumDetail, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(AlbumsActions.loadAlbumDetailSuccess, (state, { album }) => ({
    ...state,
    currentAlbum: album,
    loading: false
  })),

  on(AlbumsActions.loadAlbumDetailFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(AlbumsActions.filterAlbums, (state, { query, category }) => {
    const currentFilter = { ...state.currentFilter, query, category };
    const filteredAlbums = applyFilters(state.albums, currentFilter);
    return {
      ...state,
      currentFilter,
      filteredAlbums
    };
  }),

  on(AlbumsActions.sortAlbums, (state, { sortBy }) => {
    const currentFilter = { ...state.currentFilter, sortBy };
    const filteredAlbums = applyFilters(state.albums, currentFilter);
    return {
      ...state,
      currentFilter,
      filteredAlbums
    };
  })
);

function applyFilters(albums: Album[], filter: any) {
  let result = [...albums];

  if (filter.query) {
    const query = filter.query.toLowerCase();
    result = result.filter(album =>
      album.title.toLowerCase().includes(query) ||
      album.artist.toLowerCase().includes(query)
    );
  }

  if (filter.category && filter.category !== 'All') {
    result = result.filter(album => album.category === filter.category);
  }

  if (filter.sortBy) {
    result = result.sort((a, b) => {
      switch (filter.sortBy) {
        case 'name':
          return a.title.localeCompare(b.title);
        case 'artist':
          return a.artist.localeCompare(b.artist);
        case 'year':
          return b.year - a.year;
        default:
          return 0;
      }
    });
  }

  return result;
}
