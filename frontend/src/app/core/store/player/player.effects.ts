// store/player/player.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as PlayerActions from './player.actions';
import { PlayerService } from '../../services/player.service';

@Injectable()
export class PlayerEffects {
  constructor(
    private actions$: Actions,
    private playerService: PlayerService
  ) {}

  playTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.playTrack),
      tap(({track}) => this.playerService.play(track))
    ),
    { dispatch: false }
  );

  pauseTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.pauseTrack),
      tap(() => this.playerService.pause())
    ),
    { dispatch: false }
  );

  seekTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.seekTrack),
      tap(({ time }) => this.playerService.seekTrack(time))
    ),
    { dispatch: false }
  );

  setCurrentTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.setCurrentTrack),
      tap(({ track }) => this.playerService.setTrack(track))
    ),
    { dispatch: false }
  );

  nextTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.nextTrack),
      tap(() => this.playerService.next())
    ),
    { dispatch: false }
  );

  previousTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.previousTrack),
      tap(() => this.playerService.previous())
    ),
    { dispatch: false }
  );

  setVolume$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.setVolume),
      tap(({ volume }) => this.playerService.setVolume(volume))
    ),
    { dispatch: false }
  );

  setPlaylist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.setPlaylist),
      tap(({ tracks, currentIndex }) => this.playerService.setPlaylist(tracks, currentIndex))
    ),
    { dispatch: false }
  );

  resumeTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.resumeTrack),
      tap(() => this.playerService.resume())
    ),
    { dispatch: false }
  );
}
