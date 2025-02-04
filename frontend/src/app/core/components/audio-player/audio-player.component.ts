import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCurrentTrack, selectIsPlaying } from '../../store/player/player.selectors';
import { playTrack, pauseTrack, seekTrack } from '../../store/player/player.actions';

@Component({
  selector: 'app-audio-player',
  template: `
    <div class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg">
      <div class="container mx-auto px-4 py-3">
        <div class="flex items-center justify-between">
          <!-- Track Info -->
          <div class="flex items-center space-x-4">
            <img
              [src]="(currentTrack$ | async)?.albumCover || 'assets/default-album.png'"
              alt="Album Cover"
              class="w-12 h-12 rounded"
            >
            <div>
              <h3 class="text-sm font-medium dark:text-white">
                {{ (currentTrack$ | async)?.title }}
              </h3>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {{ (currentTrack$ | async)?.artist }}
              </p>
            </div>
          </div>

          <!-- Player Controls -->
          <div class="flex items-center space-x-4">
            <button class="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              (click)="togglePlay()"
              class="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
            >
              <svg *ngIf="!(isPlaying$ | async)" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              </svg>
              <svg *ngIf="isPlaying$ | async" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6" />
              </svg>
            </button>

            <button class="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <!-- Progress Bar -->
          <div class="flex-1 mx-4">
            <input
              type="range"
              min="0"
              [max]="duration"
              [value]="currentTime"
              (input)="onSeek($event)"
              class="w-full"
            >
          </div>

          <!-- Volume Control -->
          <div class="flex items-center space-x-2">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <input
              type="range"
              min="0"
              max="100"
              [value]="volume"
              (input)="onVolumeChange($event)"
              class="w-20"
            >
          </div>
        </div>
      </div>

      <audio #audioPlayer (timeupdate)="onTimeUpdate()" (loadedmetadata)="onMetadataLoaded()">
        <source [src]="(currentTrack$ | async)?.url" type="audio/mpeg">
      </audio>
    </div>
  `
})
export class AudioPlayerComponent implements OnInit {
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  currentTrack$: Observable<any>;
  isPlaying$: Observable<boolean>;
  duration: number = 0;
  currentTime: number = 0;
  volume: number = 100;

  constructor(private store: Store) {
    this.currentTrack$ = this.store.select(selectCurrentTrack);
    this.isPlaying$ = this.store.select(selectIsPlaying);
  }

  ngOnInit() {
    this.isPlaying$.subscribe(isPlaying => {
      if (isPlaying) {
        this.audioPlayer.nativeElement.play();
      } else {
        this.audioPlayer.nativeElement.pause();
      }
    });
  }

  togglePlay() {
    if (this.audioPlayer.nativeElement.paused) {
      this.store.dispatch(playTrack());
    } else {
      this.store.dispatch(pauseTrack());
    }
  }

  onSeek(event: Event) {
    const time = +(event.target as HTMLInputElement).value;
    this.audioPlayer.nativeElement.currentTime = time;
    this.store.dispatch(seekTrack({ time }));
  }

  onVolumeChange(event: Event) {
    this.volume = +(event.target as HTMLInputElement).value;
    this.audioPlayer.nativeElement.volume = this.volume / 100;
  }

  onTimeUpdate() {
    this.currentTime = this.audioPlayer.nativeElement.currentTime;
  }

  onMetadataLoaded() {
    this.duration = this.audioPlayer.nativeElement.duration;
  }
}
