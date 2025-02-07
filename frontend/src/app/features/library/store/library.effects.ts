import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as LibraryActions from './library.actions';
import { environment } from '../../../../environments/environment';
import { Track } from '../models/track.interface';

@Injectable()
export class LibraryEffects {
  private baseUrl = environment.api.baseUrl + environment.api.endpoints.songs.base;
  private searchUrl = environment.api.baseUrl + environment.api.endpoints.songs.search;

  loadTracks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LibraryActions.loadTracks),
      switchMap(() => {
        const params = new HttpParams()
          .set('pageSize', environment.api.defaultPagination.pageSize.toString())
          .set('pageIndex', environment.api.defaultPagination.pageIndex.toString());

        return this.http.get<Track[]>(this.baseUrl, { params }).pipe(
          map(tracks => {
            // Transform the tracks to match the expected format
            const transformedTracks = tracks.map(track => ({
              id: track.id,
              title: track.title,
              artist: track.album?.artist || '',
              duration: track.duration,
              url: track.fileId ?
                `${environment.api.baseUrl}/songs/${track.fileId}/audio` : '',
              category: track.album?.category || 'All',
              albumCover: track.album?.coverUrl || '',
              album: track.album?.title || ''
            }));
            return LibraryActions.loadTracksSuccess({ tracks: transformedTracks });
          }),
          catchError(error => of(LibraryActions.loadTracksFailure({ error: error.message })))
        );
      })
    )
  );

  setLibraryFilters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LibraryActions.setLibraryFilters),
      switchMap(action => {
        let params = new HttpParams()
          .set('pageSize', environment.api.defaultPagination.pageSize.toString())
          .set('pageIndex', environment.api.defaultPagination.pageIndex.toString());

        if (action.searchTerm) params = params.set('query', action.searchTerm);
        if (action.category) params = params.set('category', action.category);
        if (action.sortBy) params = params.set('sortBy', action.sortBy);

        return this.http.get<{ tracks: any[] }>(this.searchUrl, { params }).pipe(
          map(response => LibraryActions.loadTracksSuccess({ tracks: response.tracks })),
          catchError(error => of(LibraryActions.loadTracksFailure({ error: error.message })))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}
}
