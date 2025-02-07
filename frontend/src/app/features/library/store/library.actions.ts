import { createAction, props } from '@ngrx/store';

export const loadTracks = createAction('[Library] Load Tracks');

export const loadTracksSuccess = createAction(
  '[Library] Load Tracks Success',
  props<{ tracks: any[] }>()
);

export const loadTracksFailure = createAction(
  '[Library] Load Tracks Failure',
  props<{ error: any }>()
);

export const setLibraryFilters = createAction(
  '[Library] Set Filters',
  props<{
    searchTerm?: string;
    category?: string;
    sortBy?: string
  }>()
);
