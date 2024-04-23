import { ApiHeaders } from "./ApiHeaderResponse";
import { Track } from "./TracksResponse";

export interface Playlist {
  id: string;
  name: string;
  creationdate: string;
  user_id: string;
  user_name: string;
  zip: string;
  shorturl?: string;
  shareurl?: string;
  tracks?: Track[];
}

export interface ArtistsApiResponse {
  headers: ApiHeaders;
  results: Playlist[];
}
