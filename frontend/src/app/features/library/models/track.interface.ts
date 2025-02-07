export interface Track {
  id: string;
  title: string;
  duration: number;
  number: number;
  album: {
    coverUrl: string;
    category: string;
    id: string;
    title: string;
    artist: string;
    year: number;
    songs: any[] | null;
    createdAt: string | null;
    updatedAt: string | null;
  };
  fileId: string | null;
  content: any | null;
  createdAt: string;
  updatedAt: string;
}

export interface TracksResponse {
  tracks: Track[];
}
