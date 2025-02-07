import { createReducer, on } from '@ngrx/store';
import * as AlbumsActions from './albums.actions';
import { Album, ApiError, PaginatedResponse } from '../models/album.model';

export type SortBy = "name" | "artist" | "year" | string | undefined;
export interface FilterParams {
  query?: string;
  category?: string;
  sortBy?: SortBy;
  pageSize?: number;
  pageIndex?: number;
}
export interface AlbumsState {
  albums: PaginatedResponse<Album> | null;
  filteredAlbums: PaginatedResponse<Album> | null;
  searchResults: PaginatedResponse<Album> | null;
  currentAlbum: Album | null;
  loading: boolean;
  searching: boolean;
  error: ApiError | null;
  currentFilter: FilterParams
  pagination: {
    total: number;
    pageSize: number;
    pageIndex: number;
  };
}


export const initialState: AlbumsState = {
  albums: null,
  filteredAlbums: null,
  searchResults: null,
  currentAlbum: null,
  loading: false,
  searching: false,
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

  on(AlbumsActions.filterAlbums, (state, { params }) => {
    const currentFilter = { ...state.currentFilter, ...params };
    const filteredAlbums = state.albums
      ? applyFilters(state.albums, currentFilter)
      : null;

    return {
      ...state,
      currentFilter,
      filteredAlbums,
      pagination: filteredAlbums ? {
        total: filteredAlbums.total,
        pageSize: filteredAlbums.pageSize,
        pageIndex: filteredAlbums.pageIndex
      } : state.pagination
    };
  }),

  on(AlbumsActions.sortAlbums, (state, { params }) => {
    const currentFilter = { ...state.currentFilter, ...params };
    const filteredAlbums = state.albums
      ? applyFilters(state.albums, currentFilter)
      : null;

    return {
      ...state,
      currentFilter,
      filteredAlbums,
      pagination: filteredAlbums ? {
        total: filteredAlbums.total,
        pageSize: filteredAlbums.pageSize,
        pageIndex: filteredAlbums.pageIndex
      } : state.pagination
    };
  }),

  on(AlbumsActions.searchAlbums, state => ({
    ...state,
    searching: true,
    error: null
  })),

  on(AlbumsActions.searchAlbumsSuccess, (state, { response }) => ({
    ...state,
    searchResults: response,
    searching: false
  })),

  on(AlbumsActions.searchAlbumsFailure, (state, { error }) => ({
    ...state,
    searching: false,
    error
  }))

);

function applyFilters(
  paginatedAlbums: PaginatedResponse<Album>,
  filter: FilterParams
): PaginatedResponse<Album> {
  let result = [...paginatedAlbums.items];

  // Apply filtering
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

  // Apply sorting
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

  // Apply pagination
  const pageSize = filter.pageSize || paginatedAlbums.pageSize;
  const pageIndex = filter.pageIndex || paginatedAlbums.pageIndex;
  const start = pageIndex * pageSize;
  const paginatedItems = result.slice(start, start + pageSize);

  // Return paginated response
  return {
    items: paginatedItems,
    total: result.length,
    pageSize,
    pageIndex
  };
}

