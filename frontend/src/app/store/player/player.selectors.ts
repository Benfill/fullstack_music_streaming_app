import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PlayerState } from './player.reducer';

export const selectPlayerState = createFeatureSelector<PlayerState>('player');

export const selectIsPlaying = createSelector(
  selectPlayerState,
  (state) => state.isPlaying
);

export const selectCurrentTrack = createSelector(
  selectPlayerState,
  (state) => state.currentTrack
);

export const selectVolume = createSelector(
  selectPlayerState,
  (state) => state.volume
);

export const selectShuffle = createSelector(
  selectPlayerState,
  (state) => state.shuffle
);

export const selectRepeat = createSelector(
  selectPlayerState,
  (state) => state.repeat
);

// Add other selectors as needed
