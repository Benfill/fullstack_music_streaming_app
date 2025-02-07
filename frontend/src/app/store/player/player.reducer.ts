import { createReducer, on } from '@ngrx/store';
import * as PlayerActions from './player.actions';

export interface PlayerState {
  isPlaying: boolean;
  currentTrack: {
    id: string;
    url: string;
    title: string;
    artist: string;
    albumCover?: string;
  } | null;
  volume: number;
  currentTime: number;
  shuffle: boolean;
  repeat: boolean;
}

export const initialState: PlayerState = {
  isPlaying: false,
  currentTrack: null,
  volume: 100,
  currentTime: 0,
  shuffle: false,
  repeat: false,
};

export const playerReducer = createReducer(
  initialState,
  on(PlayerActions.playTrack, (state, { track }) => ({
    ...state,
    isPlaying: true,
    currentTrack: track
  })),
  on(PlayerActions.pauseTrack, (state) => ({
    ...state,
    isPlaying: false,
  })),
  on(PlayerActions.resumeTrack, (state) => ({
    ...state,
    isPlaying: true,
  })),
  on(PlayerActions.stopTrack, (state) => ({
    ...state,
    isPlaying: false,
    currentTrack: null,
    currentTime: 0
  })),
  on(PlayerActions.seekTrack, (state, { time }) => ({
    ...state,
    currentTime: time
  })),
  on(PlayerActions.setVolume, (state, { volume }) => ({
    ...state,
    volume,
  })),
  on(PlayerActions.toggleShuffle, (state) => ({
    ...state,
    shuffle: !state.shuffle,
  })),
  on(PlayerActions.toggleRepeat, (state) => ({
    ...state,
    repeat: !state.repeat,
  }))
);
