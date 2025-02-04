import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { LibraryService } from '../services/library.service';
import * as LibraryActions from './library.actions';

@Injectable()
export class LibraryEffects {
  loadTracks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LibraryActions.loadTracks),
      mergeMap(() =>
        this.libraryService.getTracks().pipe(
          map(response => LibraryActions.loadTracksSuccess({ tracks: response.data })),
          catchError(error => of(LibraryActions.loadTracksFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private libraryService: LibraryService
  ) {}
}
