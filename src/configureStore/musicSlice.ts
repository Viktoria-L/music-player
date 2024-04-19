import { createSlice } from "@reduxjs/toolkit";
import { Track } from "../models/TracksResponse";
import { Album } from "../models/AlbumResponse";
import { PayloadAction } from "@reduxjs/toolkit";

//let trackIndex;
//Spara musiken som man laddat i state här
//TODO, låten behöver in här

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
  tracks: Track[];
  singleTrack: TrackInfo;
  currentTrack: TrackInfo;
  albums: Album[];
  currentAlbum: Album | null;
}

const initialState: MusicState = {
  trackIndex: 0,
  timeProgress: 0,
  duration: 0,
  tracks: [],
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
    name: "Nothing",
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
};

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    setTracksFromApi: (state, action) => {
      state.tracks = action.payload;
      if (action.payload.length > 0) {
        state.currentTrack = action.payload[0];
      }
    },
    setSingleTrack: (state, action: PayloadAction<Track>) => {
      state.singleTrack = action.payload;
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
        state.trackIndex = state.trackIndex + 1;
      }
      state.currentTrack = state.tracks[state.trackIndex];
    },
    handlePrevious: (state) => {
      if (state.trackIndex === 0) {
        state.trackIndex = state.tracks.length - 1;
      } else {
        state.trackIndex = state.trackIndex - 1;
      }
      state.currentTrack = state.tracks[state.trackIndex];
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setTimeProgress: (state, action) => {
      state.timeProgress = action.payload;
    },
  },
});

export const {
  handleNext,
  handlePrevious,
  setDuration,
  setTimeProgress,
  setTracksFromApi,
  setAlbums,
  setCurrentAlbum,
  setCurrentTrack,
  setSingleTrack,
  resetTracks,
} = musicSlice.actions;
export default musicSlice.reducer;
