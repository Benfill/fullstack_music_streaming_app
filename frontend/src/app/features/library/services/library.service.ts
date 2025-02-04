import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private apiUrl = `${environment.apiUrl}/api/user/songs`;

  constructor(private http: HttpClient) {}

  getTracks(params?: { page?: number; limit?: number }): Observable<any> {
    let httpParams = new HttpParams();

    if (params?.page) {
      httpParams = httpParams.set('page', params.page.toString());
    }
    if (params?.limit) {
      httpParams = httpParams.set('limit', params.limit.toString());
    }

    return this.http.get(this.apiUrl, { params: httpParams });
  }

  searchTracks(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search`, {
      params: { query }
    });
  }

  getTrackAudio(fileId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/songs/${fileId}/audio`);
  }
}
