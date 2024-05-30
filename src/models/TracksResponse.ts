import { ApiHeaders } from "./ApiHeaderResponse";
//Typmodeller för responsen på tracks

export interface MusicInfo {
  vocalinstrumental: string;
  lang: string;
  gender: string;
  acousticelectric: string;
  speed: string;
  tags: {
    genres: string[];
    instruments: string[];
    vartags: string[];
  };
}

interface Waveform {
  peaks: number[];
}

export interface Track {
  id: string;
  position: number | string;
  name: string;
  duration: number;
  license_ccurl: string;
  audio: string;
  audiodownload: string;
  audiodownload_allowed: boolean;
  playlistadddate?: string;
  artist_id?: string;
  artist_name?: string;
  artist_idstr?: string;
  album_name?: string;
  album_id?: string;
  releasedate?: string;
  album_image?: string;
  prourl?: string;
  shorturl?: string;
  shareurl?: string;
  waveform?: Waveform;
  image?: string;
  musicinfo?: MusicInfo;
}

export interface TrackApiResponse {
  headers: ApiHeaders;
  results: Track[];
}
