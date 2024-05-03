import { createSlice } from "@reduxjs/toolkit";
import { Track } from "../../models/TracksResponse";
import { Album } from "../../models/AlbumResponse";
import { PayloadAction } from "@reduxjs/toolkit";
import { Artist } from "../../models/ArtistsResponse";
import { Playlist } from "../../models/PlaylistResponse";

// Fungerade inte med playbacken när denna funktion var med..
//function getInitialTrack(): TrackInfo {
//   const savedTrack = localStorage.getItem("currentTrack");
//   if (savedTrack !== null) {
//     try {
//       return JSON.parse(savedTrack);
//     } catch (e) {
//       console.error("Error parsing JSON from localStorage", e);
//     }
//   }
//   return {
//     id: "",
//     image: "",
//     artist_name: "",
//     name: "",
//     audio:
//       "https://prod-1.storage.jamendo.com?trackid=731375&format=mp31&from=i5U7MWMtdOYWAz65k7b3CA%3D%3D%7Croc11GGo7TJaoivljQquHw%3D%3D",
//   };
// }

// export function saveToLocalStorage(state: MusicState) {
//   localStorage.setItem("currentTrack", JSON.stringify(state.currentTrack));
// }

interface TrackInfo {
  id: string;
  artist_name?: string;
  audio: string;
  name: string;
  image?: string;
}

interface MusicState {
  trackIndex: number;
  timeProgress: number;
  duration: number;
  artists: Artist[];
  tracks: Track[];
  featuredTracks: Track[];
  singleTrack: TrackInfo;
  currentTrack: TrackInfo;
  albums: Album[];
  currentAlbum: Album | null;
  playlists: Playlist[];
  searchResults: Track[];
  isPlaying: boolean;
}

const initialState: MusicState = {
  trackIndex: 0,
  timeProgress: 0,
  duration: 0,
  artists: [],
  tracks: [],
  featuredTracks: [],
  singleTrack: {
    id: "",
    image: "",
    artist_name: "",
    name: "Nothing",
    audio:
      "https://prod-1.storage.jamendo.com?trackid=731375&format=mp31&from=i5U7MWMtdOYWAz65k7b3CA%3D%3D%7Croc11GGo7TJaoivljQquHw%3D%3D",
  },
  currentTrack: {
    id: "",
    image: "",
    artist_name: "",
    name: "",
    audio:
      "https://prod-1.storage.jamendo.com?trackid=731375&format=mp31&from=i5U7MWMtdOYWAz65k7b3CA%3D%3D%7Croc11GGo7TJaoivljQquHw%3D%3D",
  },
  albums: [],
  currentAlbum: {
    id: "",
    name: "",
    releasedate: "",
    artist_id: "",
    artist_name: "",
    image: "",
    zip: "",
    shorturl: "",
    shareurl: "",
    zip_allowed: true,
    tracks: [],
  },
  playlists: [],
  searchResults: [],
  isPlaying: false,
};

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    setTracksFromApi: (
      state,
      action: PayloadAction<{ tracks: Track[]; index?: number }>
    ) => {
      const { tracks, index = 0 } = action.payload;
      state.tracks = tracks;
      state.trackIndex = index;
      if (tracks.length > 0) {
        state.currentTrack = tracks[index];
        // tracks[index >= 0 && index < tracks.length ? index : 0];
        // state.trackIndex = index;
      }
    },
    setSingleTrack: (state, action: PayloadAction<Track>) => {
      state.singleTrack = action.payload;
    },
    setFeaturedTracks: (state, action: PayloadAction<Track[]>) => {
      state.featuredTracks = action.payload;
    },
    setArtists: (state, action: PayloadAction<Artist[]>) => {
      state.artists = action.payload;
    },
    setAlbums: (state, action: PayloadAction<Album[]>) => {
      state.albums = action.payload;
    },
    setCurrentAlbum: (state, action: PayloadAction<Album[]>) => {
      state.currentAlbum = action.payload[0];
    },
    setCurrentTrack: (state, action: PayloadAction<Track>) => {
      state.currentTrack = action.payload;
    },
    setPlaylists: (state, action: PayloadAction<Playlist[]>) => {
      state.playlists = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<Track[]>) => {
      state.searchResults = action.payload;
    },
    resetTracks: (state) => {
      state.tracks = [];
      state.trackIndex = 0;
      state.currentTrack = {
        id: "",
        image: "",
        artist_name: "",
        name: "Nothing",
        audio:
          "https://prod-1.storage.jamendo.com?trackid=731375&format=mp31&from=i5U7MWMtdOYWAz65k7b3CA%3D%3D%7Croc11GGo7TJaoivljQquHw%3D%3D",
      };
    },
    handleNext: (state) => {
      if (state.trackIndex >= state.tracks.length - 1) {
        state.trackIndex = 0;
      } else {
        state.trackIndex += 1;
      }
      state.currentTrack = state.tracks[state.trackIndex];
    },
    handlePrevious: (state) => {
      if (state.trackIndex === 0) {
        state.trackIndex = state.tracks.length - 1;
      } else {
        state.trackIndex -= 1;
      }
      state.currentTrack = state.tracks[state.trackIndex];
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setTimeProgress: (state, action) => {
      state.timeProgress = action.payload;
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setPlayStatus: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
  },
});

export const {
  handleNext,
  handlePrevious,
  setDuration,
  setTimeProgress,
  setTracksFromApi,
  setFeaturedTracks,
  setArtists,
  setAlbums,
  setCurrentAlbum,
  setCurrentTrack,
  setSingleTrack,
  resetTracks,
  togglePlay,
  setPlayStatus,
  setPlaylists,
  setSearchResults,
} = musicSlice.actions;
export default musicSlice.reducer;
