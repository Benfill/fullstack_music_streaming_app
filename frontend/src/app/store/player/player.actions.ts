// store/player/player.actions.ts
import { createAction, props } from '@ngrx/store';
import { Song } from '../../features/albums/models/album.model';

export const playTrack = createAction(
  '[Player] Play Track',
  props<{ track: Song }>()
);

export const pauseTrack = createAction('[Player] Pause Track');
export const resumeTrack = createAction('[Player] Resume Track');
export const stopTrack = createAction('[Player] Stop Track');

export const seekTrack = createAction(
  '[Player] Seek Track',
  props<{ time: number }>()
);

export const setCurrentTrack = createAction(
  '[Player] Set Current Track',
  props<{ track: Song }>()
);

export const nextTrack = createAction('[Player] Next Track');
export const previousTrack = createAction('[Player] Previous Track');

export const setVolume = createAction(
  '[Player] Set Volume',
  props<{ volume: number }>()
);

export const setPlaylist = createAction(
  '[Player] Set Playlist',
  props<{ tracks: Song[]; currentIndex: number }>()
);

export const toggleShuffle = createAction('[Player] Toggle Shuffle');
export const toggleRepeat = createAction('[Player] Toggle Repeat');
