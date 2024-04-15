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

// "tracks":[
//     {
//       "album_id":"104336",
//       "album_name":"Season One",
//       "id":"887209",
//       "name":"Scene 5",
//       "duration":"325",
//       "releasedate":"2011-12-29",
//       "license_ccurl":"http:\/\/creativecommons.org\/licenses\/by-nc-sa\/3.0\/",
//       "album_image":"https:\/\/usercontent.jamendo.com?type=album&id=104336&width=300&trackid=887209",
//       "image":"https:\/\/usercontent.jamendo.com?type=album&id=104336&width=300&trackid=887209",
//       "audio":"https:\/\/prod-1.storage.jamendo.com\/?trackid=887209&format=mp31&from=app-devsite",
//       "audiodownload":"https:\/\/prod-1.storage.jamendo.com\/download\/track\/887209\/mp31\/",
//       "audiodownload_allowed":true
//     },
