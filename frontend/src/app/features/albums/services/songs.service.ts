import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Song, PaginatedResponse } from '../models/album.model';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  private baseUrl = environment.api.baseUrl + environment.api.endpoints.songs.base;
  private searchUrl = environment.api.baseUrl + environment.api.endpoints.songs.search;
  private audioUrl = environment.api.baseUrl + environment.api.endpoints.songs.audio;

  constructor(private http: HttpClient) {}

  getSongs(pageIndex = 0, pageSize = environment.api.defaultPagination.pageSize): Observable<PaginatedResponse<Song>> {
    const params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PaginatedResponse<Song>>(this.baseUrl, { params });
  }

  getSongById(id: string): Observable<Song> {
    return this.http.get<Song>(`${this.baseUrl}/${id}`);
  }

  getSongAudio(fileId: string): Observable<Blob> {
    const url = this.audioUrl.replace(':fileId', fileId);
    return this.http.get(url, { responseType: 'blob' });
  }

  searchSongs(query: string, pageIndex = 0, pageSize = environment.api.defaultPagination.pageSize): Observable<PaginatedResponse<Song>> {
    const params = new HttpParams()
      .set('query', query)
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PaginatedResponse<Song>>(this.searchUrl, { params });
  }

  // Admin endpoints
  createSong(song: Partial<Song>): Observable<Song> {
    const adminUrl = environment.api.baseUrl + environment.api.endpoints.admin.songs;
    return this.http.post<Song>(adminUrl, song);
  }

  updateSong(id: string, song: Partial<Song>): Observable<Song> {
    const adminUrl = environment.api.baseUrl + environment.api.endpoints.admin.songs;
    return this.http.put<Song>(`${adminUrl}/${id}`, song);
  }

  deleteSong(id: string): Observable<void> {
    const adminUrl = environment.api.baseUrl + environment.api.endpoints.admin.songs;
    return this.http.delete<void>(`${adminUrl}/${id}`);
  }
}
