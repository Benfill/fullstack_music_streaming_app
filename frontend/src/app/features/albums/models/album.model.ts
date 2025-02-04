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
