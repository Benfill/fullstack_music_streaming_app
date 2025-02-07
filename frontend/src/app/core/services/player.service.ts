// services/player.service.ts
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private audio = new Audio();
  private currentTrack = new BehaviorSubject<any>(null);
  private isPlaying = new BehaviorSubject<boolean>(false);
  private audioElement: HTMLAudioElement | null = null;
  private playlist: any[] = [];
  private currentIndex = -1;
  private volume = new BehaviorSubject<number>(100);

  currentTrack$ = this.currentTrack.asObservable();
  isPlaying$ = this.isPlaying.asObservable();
  volume$ = this.volume.asObservable();

  constructor() {
    this.audio.addEventListener('ended', () => {
      this.isPlaying.next(false);
    });
  }

  play(track: any) {
    const trackUrl = environment.api.baseUrl + environment.api.endpoints.songs.audio.replace(':fileId', track.fileId);

    if (this.currentTrack.value?.id !== track.id) {
      this.audio.src = trackUrl;
      this.currentTrack.next(track);
    }

    this.audio.play();
    this.isPlaying.next(true);
  }

  pause() {
    this.audio.pause();
    this.isPlaying.next(false);
  }

  resume() {
    this.audio.play();
    this.isPlaying.next(true);
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.isPlaying.next(false);
    this.currentTrack.next(null);
  }

  seekTrack(time: number): void {
    if (this.audio) {
      this.audio.currentTime = time;
    }
  }

  setTrack(track: any) {
    const trackUrl = environment.api.baseUrl + environment.api.endpoints.songs.audio.replace(':fileId', track.fileId);
    this.audio.src = trackUrl;
    this.currentTrack.next(track);
  }

  next() {
    if (this.playlist.length === 0) return;

    this.currentIndex = (this.currentIndex + 1) % this.playlist.length;
    const nextTrack = this.playlist[this.currentIndex];
    this.setTrack(nextTrack);
    this.play(nextTrack);
  }

  previous() {
    if (this.playlist.length === 0) return;

    this.currentIndex = this.currentIndex === 0
      ? this.playlist.length - 1
      : this.currentIndex - 1;
    const previousTrack = this.playlist[this.currentIndex];
    this.setTrack(previousTrack);
    this.play(previousTrack);
  }

  setVolume(volume: number) {
    this.volume.next(volume);
    this.audio.volume = volume / 100;
  }

  setPlaylist(tracks: any[], currentIndex: number) {
    this.playlist = tracks;
    this.currentIndex = currentIndex;

    if (tracks.length > 0 && currentIndex >= 0 && currentIndex < tracks.length) {
      const track = tracks[currentIndex];
      this.setTrack(track);
      this.play(track);
    }
  }
}
