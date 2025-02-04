import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Album, PaginatedResponse, AlbumSearchParams } from '../models/album.model';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  private baseUrl = environment.api.baseUrl + environment.api.endpoints.albums.base;
  private searchUrl = environment.api.baseUrl + environment.api.endpoints.albums.search;
  private yearSortUrl = environment.api.baseUrl + environment.api.endpoints.albums.yearSort;

  constructor(private http: HttpClient) {}

  getAlbums(params?: Partial<AlbumSearchParams>): Observable<PaginatedResponse<Album>> {
    let httpParams = new HttpParams();

    if (params) {
      if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize.toString());
      if (params.pageIndex) httpParams = httpParams.set('pageIndex', params.pageIndex.toString());
      if (params.sortBy) httpParams = httpParams.set('sortBy', params.sortBy);
    }

    return this.http.get<PaginatedResponse<Album>>(this.baseUrl, { params: httpParams });
  }

  getAlbumById(id: string): Observable<Album> {
    return this.http.get<Album>(`${this.baseUrl}/${id}`);
  }

  searchAlbums(params: AlbumSearchParams): Observable<PaginatedResponse<Album>> {
    let httpParams = new HttpParams();

    if (params.query) httpParams = httpParams.set('query', params.query);
    if (params.category) httpParams = httpParams.set('category', params.category);
    if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize.toString());
    if (params.pageIndex) httpParams = httpParams.set('pageIndex', params.pageIndex.toString());

    return this.http.get<PaginatedResponse<Album>>(this.searchUrl, { params: httpParams });
  }

  getAlbumsByYear(): Observable<Album[]> {
    return this.http.get<Album[]>(this.yearSortUrl);
  }

  // Admin endpoints
  createAlbum(album: Partial<Album>): Observable<Album> {
    const adminUrl = environment.api.baseUrl + environment.api.endpoints.admin.albums;
    return this.http.post<Album>(adminUrl, album);
  }

  updateAlbum(id: string, album: Partial<Album>): Observable<Album> {
    const adminUrl = environment.api.baseUrl + environment.api.endpoints.admin.albums;
    return this.http.put<Album>(`${adminUrl}/${id}`, album);
  }

  deleteAlbum(id: string): Observable<void> {
    const adminUrl = environment.api.baseUrl + environment.api.endpoints.admin.albums;
    return this.http.delete<void>(`${adminUrl}/${id}`);
  }
}
