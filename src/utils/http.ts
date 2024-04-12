import { state } from './state';
import axios from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { setTracksFromApi } from '../configureStore/musicSlice';


// //------------- Get Tracks ----------------//

// export const getAllProducts = async ():  Promise<ProductData[] | null> => {
//     const API_URL: string = state.api.baseUrl;
//     try {
//       const response = await axios.get(`${API_URL}tracks`)
//       return response.data.data;
//     } catch(error) {
//       console.log(error)
//       return null;
//     }
//   }

// limit parameter sätter gränsen för hur många responer,default är 10
//   const response = await axios.get(`${API_URL}albums/?client_id=${clientId}&format=jsonpretty&artist_name=anitek`)
// GET 10 artists - const response = await axios.get(`${API_URL}artists/?client_id=${clientId}&format=jsonpretty`)

// const response = await axios.get(`${API_URL}artists/tracks?client_id=${clientId}&format=jsonpretty`)

// sökning på tags eller fuzzytags för genre, include för att få mer info
// https://api.jamendo.com/v3.0/tracks/?client_id=your_client_id&format=jsonpretty&limit=2&fuzzytags=groove+rock&speed=high+veryhigh&include=musicinfo&groupby=artist_id
//boost tar fram det mest populära för månaden by default

// const response = await axios.get(`${API_URL}tracks/?client_id=${clientId}&format=jsonpretty&limit=5&tags=electronic&featured=1`)

//// ------- ANVÄND FUNKTIONEN NEDANFÖR FÖR HÄMTNING ----------- //



const API_URL = "https://api.jamendo.com/v3.0/";
const clientId = "5bcc718f";

interface FetchParams {
  [key: string]: any;  // Flexiblare än att använda string
}

export const fetchDataFromJamendo = async<T>(
  endpoint: string,
  params: FetchParams = {},
  dispatch: Dispatch<any>,
  action: (data: T) => { type: string; payload: T }
) => {
  const queryParams: Record<string, string> = {
    client_id: clientId,
    format: "jsonpretty",
    ...params,
  };
  const queryParameters = new URLSearchParams(queryParams).toString();
  

  try {
    const response = await axios.get<{results: T}>(
      `${API_URL}${endpoint}?${queryParameters}`
    );
    if (response) {
         dispatch(action(response.data.results));
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

// EXEMPEL PÅ HUR ATT ANROPA FUNKTIONEN
// MAN MÅSTE SKICKA IN endpoint, parametrar, dispatch och actionen

// Exempel på att använda funktionen för 'tracks'
// fetchDataFromJamendo<Track[]>('tracks', { artist_name: 'anitek', featured: '1', limit: '5' }, dispatch, setTracksFromApi);

// // Exempel på att använda funktionen för 'albums'
// fetchDataFromJamendo<Album[]>('albums', { limit: '10' }, dispatch, setAlbumsFromApi);
