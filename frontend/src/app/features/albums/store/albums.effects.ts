// albums.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AlbumsService } from '../services/albums.service';
import * as AlbumsActions from './albums.actions';

@Injectable()
export class AlbumsEffects {
  loadAlbums$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlbumsActions.loadAlbums),
      switchMap(() =>
        this.albumsService.getAlbums().pipe(
          map(albums => AlbumsActions.loadAlbumsSuccess({ albums })),
          catchError(error =>
            of(AlbumsActions.loadAlbumsFailure({ error }))
          )
        )
      )
    )
  );

  loadAlbumDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlbumsActions.loadAlbumDetail),
      switchMap(({ id }) =>
        this.albumsService.getAlbumById(id).pipe(
          map(album => AlbumsActions.loadAlbumDetailSuccess({ album })),
          catchError(error =>
            of(AlbumsActions.loadAlbumDetailFailure({ error }))
          )
        )
      )
    )
  );

  searchAlbums$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlbumsActions.searchAlbums),
      debounceTime(300),
      distinctUntilChanged((prev, curr) =>
        prev.params.query === curr.params.query &&
        prev.params.category === curr.params.category &&
        prev.params.pageSize === curr.params.pageSize &&
        prev.params.pageIndex === curr.params.pageIndex
      ),
      switchMap(({ params }) =>
        this.albumsService.searchAlbums(params).pipe(
          map(response => AlbumsActions.searchAlbumsSuccess({ response })),
          catchError(error =>
            of(AlbumsActions.searchAlbumsFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private albumsService: AlbumsService
  ) {}
}
