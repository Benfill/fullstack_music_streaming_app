import { environment } from 'src/environments/environment';

export interface Album {
  id: string;
  title: string;
  artist: string;
  year: number;
  category?: string;
  coverUrl?: string;
  songs: Song[];
  createdAt: string;
  updatedAt: string;
}

export interface Song {
  id: string;
  title: string;
  url: string;
  artist: string;
  albumCover?: string;
  duration: number;
  fileId: string;
  trackNumber: number;
  albumId: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  pageSize: number;
  pageIndex: number;
}

export interface AlbumSearchParams {
  query?: string;
  category?: string;
  sortBy?: 'name' | 'artist' | 'year';
  pageSize?: number;
  pageIndex?: number;
}

export interface ApiError {
  statusCode: number;
  message: string;
  errors?: Record<string, string[]>;
}

export const ADMIN_API_ENDPOINTS = {
  albums: `${environment.api.baseUrl}/admin/albums`,
  songs: `${environment.api.baseUrl}/admin/songs`
} as const;

export const USER_API_ENDPOINTS = {
  albums: `${environment.api.baseUrl}/user/albums`,
  songs: `${environment.api.baseUrl}/user/songs`,
  albumSearch: `${environment.api.baseUrl}/user/albums/search`,
  songSearch: `${environment.api.baseUrl}/user/songs/search`,
  albumSort: `${environment.api.baseUrl}/user/albums/sort`
} as const;

export interface SongSearchParams {
  q?: string;
  page?: number;
}
