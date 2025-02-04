import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadAlbumDetail } from '../../store/albums.actions';
import { selectCurrentAlbum, selectLoading } from '../../store/albums.selectors';
import { setCurrentTrack, setPlaylist } from '../../../../core/store/player/player.actions';

@Component({
  selector: 'app-album-detail',
  template: `
    <div class="container mx-auto px-4 py-8" *ngIf="album$ | async as album">
      <div class="flex flex-col md:flex-row gap-8">
        <!-- Album Info -->
        <div class="w-full md:w-1/3">
          <img
            [src]="album.coverUrl"
            [alt]="album.title"
            class="w-full rounded-lg shadow-lg"
          >
          <div class="mt-4">
            <h1 class="text-3xl font-bold dark:text-white">{{ album.title }}</h1>
            <p class="text-xl text-gray-600 dark:text-gray-300">{{ album.artist }}</p>
            <p class="text-gray-500 dark:text-gray-400">
              {{ album.year }} • {{ album.tracks.length }} tracks
            </p>
            <button
              (click)="playAlbum(album)"
              class="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Play Album
            </button>
          </div>
        </div>

        <!-- Track List -->
        <div class="w-full md:w-2/3">
          <app-track-list
            [tracks]="album.tracks"
            (trackSelected)="playTrack($event, album.tracks)"
          ></app-track-list>
        </div>
      </div>
    </div>

    <div *ngIf="loading$ | async" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  `
})
export class AlbumDetailComponent implements OnInit {
  album$: Observable<any>;
  loading$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.album$ = this.store.select(selectCurrentAlbum);
    this.loading$ = this.store.select(selectLoading);
  }

  ngOnInit() {
    const albumId = this.route.snapshot.paramMap.get('id');
    if (albumId) {
      this.store.dispatch(loadAlbumDetail({ id: albumId }));
    }
  }

  playAlbum(album: any) {
    this.store.dispatch(setPlaylist({
      tracks: album.tracks,
      currentIndex: 0
    }));
  }

  playTrack(track: any, tracks: any[]) {
    const currentIndex = tracks.findIndex(t => t.id === track.id);
    this.store.dispatch(setPlaylist({
      tracks,
      currentIndex
    }));
  }
}
