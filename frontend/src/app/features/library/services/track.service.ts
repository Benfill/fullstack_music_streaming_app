import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
}

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  private apiUrl = environment.api.baseUrl + environment.api.endpoints.songs.base;

  constructor(private http: HttpClient) {}

  getTracks(page: number, pageSize: number): Observable<PaginatedResponse<Track>> {
    return this.http.get<PaginatedResponse<Track>>(this.apiUrl, {
      params: {
        pageIndex: (page - 1).toString(),
        pageSize: pageSize.toString()
      }
    });
  }
}
