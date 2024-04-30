import { createAsyncThunk } from "@reduxjs/toolkit";
import { Track } from "../../models/TracksResponse";

export interface PlaylistDetails {
  _id?: string;
  name: string;
  tracks?: Track[];
}

const baseUrl = "http://localhost:3000/api";

export const fetchFavorites = createAsyncThunk(
  "user/fetchFavorites",
  async () => {
    const response = await fetch(`${baseUrl}/favorites`, {
      credentials: "include",
    });
    return response.json();
  }
);

export const addToFavorites = createAsyncThunk(
  "user/addToFavorites",
  async (track: Track) => {
    const response = await fetch(`${baseUrl}/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(track),
      credentials: "include",
    });
    return response.json();
  }
);

export const fetchPlaylists = createAsyncThunk(
  "user/fetchPlaylists",
  async () => {
    const response = await fetch(`${baseUrl}/playlists`, {
      credentials: "include",
    });
    return response.json();
  }
);

export const createPlaylist = createAsyncThunk(
  "user/createPlaylist",
  async (playlistDetails: PlaylistDetails) => {
    const response = await fetch(`${baseUrl}/playlists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playlistDetails),
      credentials: "include",
    });
    return response.json();
  }
);

export const addSongToPlaylist = createAsyncThunk(
  "user/addSongToPlaylist",
  async ({ playlistId, track }: { playlistId: string; track: Track }) => {
    const response = await fetch(`${baseUrl}/playlists/${playlistId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(track),
      credentials: "include",
    });
    return response.json();
  }
);
