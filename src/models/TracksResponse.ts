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
    name: string;
    duration: number;
    artist_id: string;
    artist_name: string;
    artist_idstr: string;
    album_name: string;
    album_id: string;
    license_ccurl: string;
    position: number;
    releasedate: string;
    album_image: string;
    audio: string;
    audiodownload: string;
    prourl: string;
    shorturl: string;
    shareurl: string;
    waveform: Waveform;
    image: string;
    musicinfo: MusicInfo;
    audiodownload_allowed: boolean;
  }


 export interface TrackApiResponse {
    headers: ApiHeaders;
    results: Track[];
  }