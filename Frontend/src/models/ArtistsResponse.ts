import { ApiHeaders } from "./ApiHeaderResponse";

export interface Artist {
  id: string;
  name: string;
  website: string;
  joindate: string;
  image: string;
  shorturl: string;
  shareurl: string;
}

export interface ArtistsApiResponse {
  headers: ApiHeaders;
  results: Artist[];
}
