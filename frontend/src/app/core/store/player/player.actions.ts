import { createAction, props } from '@ngrx/store';

export const playTrack = createAction('[Player] Play Track');
export const pauseTrack = createAction('[Player] Pause Track');
export const seekTrack = createAction(
  '[Player] Seek Track',
  props<{ time: number }>()
);

export const setCurrentTrack = createAction(
  '[Player] Set Current Track',
  props<{ track: any }>()
);

export const nextTrack = createAction('[Player] Next Track');
export const previousTrack = createAction('[Player] Previous Track');

export const setVolume = createAction(
  '[Player] Set Volume',
  props<{ volume: number }>()
);

export const setPlaylist = createAction(
  '[Player] Set Playlist',
  props<{ tracks: any[]; currentIndex: number }>()
);
