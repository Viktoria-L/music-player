import { createSlice } from "@reduxjs/toolkit";
import { Track } from "../models/TracksResponse";
import { Album } from "../models/AlbumResponse";
import { PayloadAction } from "@reduxjs/toolkit";

//let trackIndex;
//Spara musiken som man laddat i state här
//TODO, låten behöver in här

interface CurrentTrack {
id: string,
artist_name: string,
audio: string,
name: string,
}

interface MusicState {
  trackIndex: number;
  timeProgress: number;
  duration: number;
  tracksFromApi: Track[];
  currentTrack: CurrentTrack;
  albums: Album[];
  currentAlbum: Album | null;
}

const initialState: MusicState = {
  trackIndex: 0,
  timeProgress: 0,
  duration: 0,
  tracksFromApi: [],
  currentTrack: {
    id: "",
    // position: 0,
    artist_name: '',
    name: "Nothing",
    // duration: 0,
    // license_ccurl: "",
    audio: "https://prod-1.storage.jamendo.com?trackid=731375&format=mp31&from=i5U7MWMtdOYWAz65k7b3CA%3D%3D%7Croc11GGo7TJaoivljQquHw%3D%3D",
    // audiodownload: "",
    // audiodownload_allowed: false
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
    tracks: []
  }
}

const musicSlice = createSlice({
  name: "music",
  initialState, 
  reducers: {
    setTracksFromApi: (state, action) => {
      state.tracksFromApi = action.payload;
      if (action.payload.length > 0) {
        state.currentTrack = action.payload[0];
      }
    },
    setAlbums: (state, action: PayloadAction<Album[]>) => {
      state.albums = action.payload;
    },
    setCurrentAlbum: (state, action: PayloadAction<Album>) => {
      state.currentAlbum = action.payload;
    },
    handleNext: (state, action) => {
      if (state.trackIndex >= state.tracksFromApi.length - 1) {
        state.trackIndex = 0;
      } else {
        state.trackIndex = state.trackIndex + 1;
      }
      state.currentTrack = state.tracksFromApi[state.trackIndex];
    },
    handlePrevious: (state, action) => {
      if (state.trackIndex === 0) {
        state.trackIndex = state.tracksFromApi.length - 1;
      } else {
        state.trackIndex = state.trackIndex - 1;
      }
      state.currentTrack = state.tracksFromApi[state.trackIndex];
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setTimeProgress: (state, action) => {
      state.timeProgress = action.payload;
    },
  },
});

export const { handleNext, handlePrevious, setDuration, setTimeProgress, setTracksFromApi, setAlbums, setCurrentAlbum } =
  musicSlice.actions;
export default musicSlice.reducer;
