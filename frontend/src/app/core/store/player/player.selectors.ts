import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PlayerState } from './player.reducer';

export const selectPlayerState = createFeatureSelector<PlayerState>('player');

export const selectCurrentTrack = createSelector(
  selectPlayerState,
  (state: PlayerState) => state?.currentTrack ?? null
);

export const selectPlaylist = createSelector(
  selectPlayerState,
  (state: PlayerState) => state?.playlist ?? []
);

export const selectIsPlaying = createSelector(
  selectPlayerState,
  (state: PlayerState) => state?.isPlaying ?? false
);

export const selectCurrentIndex = createSelector(
  selectPlayerState,
  (state: PlayerState) => state?.currentIndex ?? -1
);

export const selectVolume = createSelector(
  selectPlayerState,
  (state: PlayerState) => state?.volume ?? 100
);

export const selectCurrentTime = createSelector(
  selectPlayerState,
  (state: PlayerState) => state?.currentTime ?? 0
);
