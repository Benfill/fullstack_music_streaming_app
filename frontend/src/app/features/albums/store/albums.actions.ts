import { createAction, props } from '@ngrx/store';

export const loadAlbums = createAction('[Albums] Load Albums');

export const loadAlbumsSuccess = createAction(
  '[Albums] Load Albums Success',
  props<{ albums: any[] }>()
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
  props<{ album: any }>()
);

export const loadAlbumDetailFailure = createAction(
  '[Albums] Load Album Detail Failure',
  props<{ error: any }>()
);

export const filterAlbums = createAction(
  '[Albums] Filter Albums',
  props<{ query?: string; category?: string }>()
);

export const sortAlbums = createAction(
  '[Albums] Sort Albums',
  props<{ sortBy: string }>()
);
