/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import { ApiHeaders } from "../models/ApiHeaderResponse";

export const API_URL = "https://api.jamendo.com/v3.0/";
export const clientId = "5bcc718f";

interface FetchParams {
  [key: string]: any;
}

export const fetchDataFromJamendo = async <T>(
  endpoint: string,
  params: FetchParams = {},
  dispatch: Dispatch<any>,
  action: (data: T) => { type: string; payload: T },
  setError: (errorMsg: string) => void
) => {
  const queryParams: Record<string, string> = {
    client_id: clientId,
    format: "jsonpretty",
    ...params,
  };
  const queryParameters = new URLSearchParams(queryParams).toString();

  try {
    const response = await axios.get<{ headers: ApiHeaders; results: T }>(
      `${API_URL}${endpoint}?${queryParameters}`
    );
    if (response.data.headers.status !== "success") {
      const errorMsg =
        response.data.headers.error_message || "An unknown error occurred";
      setError(errorMsg);
      console.error("API error:", errorMsg);
    }
    if (response.data.headers.status === "success") {
      dispatch(action(response.data.results));
    }
  } catch (error) {
    console.error("HTTP error:", error);
    setError("Network error or server is unreachable");
    return null;
  }
};

// EXEMPEL PÅ HUR ATT ANROPA FUNKTIONEN
// MAN MÅSTE SKICKA IN endpoint, parametrar, dispatch och actionen som ska dispatchas

// Exempel på att använda funktionen för 'tracks'
// fetchDataFromJamendo<Track[]>('tracks', { artist_name: 'anitek', featured: '1', limit: '5' }, dispatch, setTracksToPlay);

// // Exempel på att använda funktionen för 'albums'
// fetchDataFromJamendo<Album[]>('albums', { limit: '10' }, dispatch, setAlbumsFromApi);
