import { ApiHeaders } from "./ApiHeaderResponse";
import { Track } from "./TracksResponse";

export interface Playlist {
  creationdate: string;
  id: string;
  name: string;
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
