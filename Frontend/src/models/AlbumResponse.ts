import { ApiHeaders } from "./ApiHeaderResponse";

// endpoint för /album
export interface Album {
  id: string;
  name: string;
  releasedate: string;
  artist_id: string;
  artist_name: string;
  image: string;
  zip: string;
  shorturl: string;
  shareurl: string;
  zip_allowed: boolean;
  tracks?: Track[];
}

export interface AlbumsApiResponse {
  headers: ApiHeaders;
  results: Album[];
}

// endpoint för /album/tracks
interface Track {
  id: string;
  position: string;
  name: string;
  duration: number;
  license_ccurl: string;
  audio: string;
  audiodownload: string;
  audiodownload_allowed: boolean;
}
