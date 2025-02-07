import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as PlayerActions from './player.actions';
import { PlayerService } from 'src/app/core/services/player.service';

@Injectable()
export class PlayerEffects {
  constructor(
    private actions$: Actions,
    private playerService: PlayerService
  ) {}

  // Example effect for logging player actions
  logPlayerActions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        PlayerActions.playTrack,
        PlayerActions.pauseTrack,
        PlayerActions.stopTrack,
        PlayerActions.resumeTrack,
        PlayerActions.seekTrack,
        PlayerActions.setVolume
      ),
      tap(action => console.log('Player action:', action))
    ),
    { dispatch: false }
  );

  playTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.playTrack),
      tap(({ track }) => this.playerService.play(track))
    ),
    { dispatch: false }
  );
}
