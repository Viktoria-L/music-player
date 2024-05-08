import { ApiHeaders } from "./ApiHeaderResponse";
import { Track } from "./TracksResponse";

export interface Artist {
  id: string;
  name: string;
  website: string;
  joindate: string;
  image: string;
  shorturl?: string;
  shareurl?: string;
  tracks?: Track[];
  albums?: Album[];
}

// export interface ArtistAlbum {
//   id: string;
//   name: string;
//   website: string;
//   joindate: string;
//   image: string;
//   albums: Album[];
// }

interface Album {
  id: string;
  name: string;
  releasedate: string;
  image: string;
}

export interface ArtistsApiResponse {
  headers: ApiHeaders;
  results: Artist[];
}

// export interface ArtistAlbumApiResponse {
//   headers: ApiHeaders;
//   results: ArtistAlbum[];
// }
