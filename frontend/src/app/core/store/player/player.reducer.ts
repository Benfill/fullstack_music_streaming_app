import { createReducer, on } from '@ngrx/store';
import * as PlayerActions from './player.actions';

export interface PlayerState {
  currentTrack: any | null;
  playlist: any[];
  currentIndex: number;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
}

export const initialState: PlayerState = {
  currentTrack: null,
  playlist: [],
  currentIndex: -1,
  isPlaying: false,
  volume: 100,
  currentTime: 0
};

export const playerReducer = createReducer(
  initialState,

  on(PlayerActions.playTrack, state => ({
    ...state,
    isPlaying: true
  })),

  on(PlayerActions.pauseTrack, state => ({
    ...state,
    isPlaying: false
  })),

  on(PlayerActions.seekTrack, (state, { time }) => ({
    ...state,
    currentTime: time
  })),

  on(PlayerActions.setCurrentTrack, (state, { track }) => ({
    ...state,
    currentTrack: track,
    isPlaying: true
  })),

  on(PlayerActions.setVolume, (state, { volume }) => ({
    ...state,
    volume
  })),

  on(PlayerActions.setPlaylist, (state, { tracks, currentIndex }) => ({
    ...state,
    playlist: tracks,
    currentIndex,
    currentTrack: tracks[currentIndex],
    isPlaying: true
  })),

  on(PlayerActions.nextTrack, state => {
    const nextIndex = (state.currentIndex + 1) % state.playlist.length;
    return {
      ...state,
      currentIndex: nextIndex,
      currentTrack: state.playlist[nextIndex],
      isPlaying: true
    };
  }),

  on(PlayerActions.previousTrack, state => {
    const previousIndex = state.currentIndex === 0
      ? state.playlist.length - 1
      : state.currentIndex - 1;
    return {
      ...state,
      currentIndex: previousIndex,
      currentTrack: state.playlist[previousIndex],
      isPlaying: true
    };
  }),

  on(PlayerActions.resumeTrack, state => ({
    ...state,
    isPlaying: true
  }))
);
