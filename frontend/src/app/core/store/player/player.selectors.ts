import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PlayerState } from './player.reducer';

export const selectPlayerState = createFeatureSelector<PlayerState>('player');

export const selectCurrentTrack = createSelector(
  selectPlayerState,
  state => state.currentTrack
);

export const selectIsPlaying = createSelector(
  selectPlayerState,
  state => state.isPlaying
);

export const selectPlaylist = createSelector(
  selectPlayerState,
  state => state.playlist
);

export const selectCurrentIndex = createSelector(
  selectPlayerState,
  state => state.currentIndex
);

export const selectVolume = createSelector(
  selectPlayerState,
  state => state.volume
);

export const selectCurrentTime = createSelector(
  selectPlayerState,
  state => state.currentTime
);
