// Här lägger jag sånt som kan vara till nytta eller behöver skrivas om

import { Album } from "../models/AlbumResponse";
import { Track } from "../models/TracksResponse";

// ----------------- ALLA GET FUNKTIONER OCH VAD DE HÄMTAR ------------ //
// Tracks - const response = await axios.get(`${API_URL}tracks/?client_id=${clientId}&format=jsonpretty&limit=5&tags=electronic&featured=1`)
// similar Tracks - const response = await axios.get(`${API_URL}tracks/similar?client_id=${clientId}
// artists - const response = await axios.get(`${API_URL}artists/?client_id=${clientId}&format=jsonpretty`)
// albums från Anitek - const response = await axios.get(`${API_URL}albums/?client_id=${clientId}&format=jsonpretty&artist_name=anitek`)
// albums  - const response = await axios.get(`${API_URL}albums/?client_id=${clientId}&format=jsonpretty`)
// albums tracks  - const response = await axios.get(`${API_URL}albums/tracks?client_id=${clientId}&format=jsonpretty&artist_name=XXXX`)
// feeds - const response = await axios.get(`${API_URL}feeds/?client_id=${clientId}&format=jsonpretty&limit=1&order=id_desc`)
// playlists  - const response = await axios.get(`${API_URL}playlists/?client_id=${clientId}&format=jsonpretty`)

//----------- GENRES ------------------------//
// lounge, classical, electronic, jazz, pop, hiphop,
// relaxation, rock, songwriter, world, metal, soundtrack.

//----------- VIKTIGA PARAMETRAR ----------- //
// * limit - default 10, gränsen för hur många svar i responsen
//* tags / fuzzytags - för sökning av genre
// * include - för att få mer info i responsen, []enum: {licenses, musicinfo, stats, lyrics}
// * featured=1 - =1 är true, visar en chart selection som Jamendo själva valt ut
// * groupby=artist_id
// * boost  - bättre relevans på sökningen t.ex. mest populära finns flera, default popularity_month
// * search - 	A free text search that operates considering track, album and artist name as well as tags (genres, instruments, ...) and similar artists

// If you are implementing some charts and you whish to trust our selections,
// the 'featured' parameter let you filter-in all the tracks selected by our music managers.
// In particular, to implement a genre-based chart in your application,
// we suggest to choose one of our featured selections:
// lounge, classical, electronic, jazz, pop, hiphop, relaxation, rock, songwriter, world, metal, soundtrack.
// Declare one of these genres in the 'tags' parameter, combine it with 'featured=1', 'groupby=artist_id',
// and then boost (boost, not order!) choosing your favorite rating.
// Your chart should look fantastic!.

//funktion för att rendera till albumsida?
const handleAlbumClick = () => {
  dispatch(setCurrentAlbum(album));
  // Eventuellt navigera till en detaljsida eller uppdatera UI för att visa albumdetaljer
};

//Omräknad sekunder till min:sek
export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;
  return `${minutes}:${secondsLeft < 10 ? "0" + secondsLeft : secondsLeft}`;
}

//Funktioner mot mitt API/mongoDB databas
const baseUrl = "http://localhost:3000/api";

interface PlaylistDetails {
  name: string;
  songs?: string[];
}

// interface SongId {
//   songId: string;
// }

export const fetchFavorites = async () => {
  const response = await fetch(`${baseUrl}/favorites`, {
    credentials: "include",
  });
  return response.json();
};

// Function to add a favorite song
export const addToFavorites = async (songDetails: Track) => {
  const response = await fetch(`${baseUrl}/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(songDetails),
    credentials: "include",
  });
  return response.json();
};

// Function to fetch playlists
export const fetchPlaylists = async () => {
  const response = await fetch(`${baseUrl}/playlists`, {
    credentials: "include",
  });
  return response.json();
};

// Function to create a new playlist
export const createPlaylist = async (playlistDetails: PlaylistDetails) => {
  const response = await fetch(`${baseUrl}/playlists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(playlistDetails),
    credentials: "include",
  });
  return response.json();
};

// Function to add a song to a playlist
export const addSongToPlaylist = async (
  playlistId: string,
  songDetails: Track
) => {
  const response = await fetch(`${baseUrl}/playlists/${playlistId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(songDetails),
    credentials: "include",
  });
  return response.json();
};
