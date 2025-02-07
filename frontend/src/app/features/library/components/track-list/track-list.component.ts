import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-track-list',
  template: `<div class="bg-white dark:bg-gray-800 rounded-lg shadow">
    <div class="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 dark:border-gray-700 font-medium text-gray-500 dark:text-gray-400">
      <div class="col-span-1">#</div>
      <div class="col-span-4">Title</div>
      <div class="col-span-3">Artist</div>
      <div class="col-span-3">Album</div>
      <div class="col-span-1">Duration</div>
    </div>

    <div class="divide-y divide-gray-200 dark:divide-gray-700">
      <div
        *ngFor="let track of tracks; let i = index"
        class="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
        (click)="onTrackClick(track)"
      >
        <div class="col-span-1 flex items-center">{{ i + 1 }}</div>
        <div class="col-span-4 flex items-center">
          <img
            src="https://i.ibb.co/d4wcLJ23/461146.png"
            alt="Album Cover"
            class="w-10 h-10 rounded mr-3"
          >
          <span class="dark:text-white">{{ track.title }}</span>
        </div>
        <div class="col-span-3 flex items-center dark:text-gray-300">
          {{ track.artist }}
        </div>
        <div class="col-span-3 flex items-center dark:text-gray-300">
          {{ track.album }}
        </div>
        <div class="col-span-1 flex items-center dark:text-gray-300">
          {{ formatDuration(track.duration) }}
        </div>
      </div>
    </div>
  </div>`
})
export class TrackListComponent {
  @Input() tracks: any[] | null = [];
  @Output() trackSelected = new EventEmitter<any>();

  onTrackClick(track: any) {
    this.trackSelected.emit(track);
  }

  formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
}
