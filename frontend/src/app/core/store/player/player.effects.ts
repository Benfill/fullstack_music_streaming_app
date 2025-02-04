import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, withLatestFrom } from 'rxjs/operators';
import * as PlayerActions from './player.actions';
import { selectPlayerState } from './player.selectors';

@Injectable()
export class PlayerEffects {
  constructor(
    private actions$: Actions,
    private store: Store
  ) {}

  // Auto-play next track when current track ends
  autoPlayNext$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.setCurrentTrack),
      withLatestFrom(this.store.select(selectPlayerState)),
      map(([_, state]) => {
        if (state.currentIndex < state.playlist.length - 1) {
          return PlayerActions.nextTrack();
        }
        return PlayerActions.pauseTrack();
      })
    )
  );
}
