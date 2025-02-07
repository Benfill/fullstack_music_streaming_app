// albums.actions.ts
import { createAction, props } from '@ngrx/store';
import { Album, AlbumSearchParams, PaginatedResponse } from '../models/album.model';
import { FilterParams, SortBy } from './albums.reducer';

export const loadAlbums = createAction('[Albums] Load Albums');

export const loadAlbumsSuccess = createAction(
  '[Albums] Load Albums Success',
  props<{ albums: PaginatedResponse<Album> }>()
);

export const loadAlbumsFailure = createAction(
  '[Albums] Load Albums Failure',
  props<{ error: any }>()
);

export const loadAlbumDetail = createAction(
  '[Albums] Load Album Detail',
  props<{ id: string }>()
);

export const loadAlbumDetailSuccess = createAction(
  '[Albums] Load Album Detail Success',
  props<{ album: Album }>()
);

export const loadAlbumDetailFailure = createAction(
  '[Albums] Load Album Detail Failure',
  props<{ error: any }>()
);


export const searchAlbums = createAction(
  '[Albums] Search Albums',
  props<{ params: AlbumSearchParams }>()
);

export const searchAlbumsSuccess = createAction(
  '[Albums] Search Albums Success',
  props<{ response: PaginatedResponse<Album> }>()
);

export const searchAlbumsFailure = createAction(
  '[Albums] Search Albums Failure',
  props<{ error: any }>()
);

export const filterAlbums = createAction(
  '[Albums] Filter Albums',
  props<{ params:FilterParams }>()
);

export const sortAlbums = createAction(
  '[Albums] Sort Albums',
  props<{ params: FilterParams }>()
);
