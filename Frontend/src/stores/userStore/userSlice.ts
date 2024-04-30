import { createSlice } from "@reduxjs/toolkit";
import { Track } from "../../models/TracksResponse";
import { PlaylistDetails } from "./userThunk";
import {
  fetchFavorites,
  addToFavorites,
  fetchPlaylists,
  createPlaylist,
  addSongToPlaylist,
} from "./userThunk";

interface UserState {
  favorites: Track[];
  playlists: PlaylistDetails[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  favorites: [],
  playlists: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch favorites
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.loading = false;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch favorites";
        state.loading = false;
      })

      // Add to favorites
      .addCase(addToFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.favorites.push(action.payload);
        state.loading = false;
      })
      .addCase(addToFavorites.rejected, (state, action) => {
        state.error = action.error.message || "Failed to add to favorites";
        state.loading = false;
      })

      // Fetch playlists
      .addCase(fetchPlaylists.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlaylists.fulfilled, (state, action) => {
        state.playlists = action.payload;
        state.loading = false;
      })
      .addCase(fetchPlaylists.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch playlists";
        state.loading = false;
      })

      // Create a new playlist
      .addCase(createPlaylist.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPlaylist.fulfilled, (state, action) => {
        state.playlists.push(action.payload);
        state.loading = false;
      })
      .addCase(createPlaylist.rejected, (state, action) => {
        state.error = action.error.message || "Failed to create playlist";
        state.loading = false;
      })

      // Add a song to a playlist
      .addCase(addSongToPlaylist.pending, (state) => {
        state.loading = true;
      })
      .addCase(addSongToPlaylist.fulfilled, (state, action) => {
        const index = state.playlists.findIndex(
          (p) => p.name === action.meta.arg.playlistId
        );
        if (index !== -1) {
          state.playlists[index].tracks = [
            ...(state.playlists[index].tracks || []),
            action.meta.arg.track,
          ];
        }
        state.loading = false;
      })
      .addCase(addSongToPlaylist.rejected, (state, action) => {
        state.error = action.error.message || "Failed to add song to playlist";
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
