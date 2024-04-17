import AudioPlayer from "../music-player/maximizedPlayer/AudioPlayer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTracksFromApi,
  setAlbums,
  setCurrentAlbum,
} from "../configureStore/musicSlice";
import { Album } from "../models/AlbumResponse";
import { fetchDataFromJamendo } from "../utils/http";
import { Featured } from "../components/Featured";
import { EntityType } from "../components/Featured";
import { Track } from "../models/TracksResponse";

const Home = () => {
  const [musicData, setMusicData] = useState(null);
  const dispatch = useDispatch();
  //const currentalbum: Album = useSelector((state: RootState) => state.musicInStore.currentAlbum);

  // SE GENERISK HÄMTNING I HTTP.JS FILEN //

  //   const fetchDataFromJamendo = async () => {
  //     const API_URL = state.api.baseUrl;
  //     const clientId = "5bcc718f";

  //     try {
  //       // limit parameter sätter gränsen för hur många responer,default är 10
  //       //   const response = await axios.get(`${API_URL}albums/?client_id=${clientId}&format=jsonpretty&artist_name=anitek`)
  //       // GET 10 artists - const response = await axios.get(`${API_URL}artists/?client_id=${clientId}&format=jsonpretty`)

  //       // const response = await axios.get(`${API_URL}artists/tracks?client_id=${clientId}&format=jsonpretty`)

  //       const response = await axios.get(
  //         `${API_URL}tracks/?client_id=${clientId}&format=jsonpretty&limit=5&tags=electronic&featured=1`
  //       );
  //       //const response = await axios.get(`${API_URL}playlists/?client_id=${clientId}&format=jsonpretty`)

  //       if (response) {
  //         setMusicData(response.data);
  //         dispatch(setTracksFromApi(response.data.results));
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       return null;
  //     }
  //   };

  //   fetchDataFromJamendo<Album[]>('albums', { limit: '10' }, dispatch, setAlbums);

  return (
    <>
      <div className="home flex flex-grow flex-col mt-8 sm:px-8 px-4">
        <h2 className="text-4xl font-bold tracking-wider">Welcome back!</h2>
        <p className="tracking-wide mt-2">Explore new music everyday</p>

        <button
          className="bold border mt-5"
          onClick={() =>
            fetchDataFromJamendo<Album[]>(
              "albums",
              { limit: "10", featured: 1 },
              dispatch,
              setAlbums
            )
          }
        >
          Fetch featured albums from Jamendo
        </button>
        <button
          className="bold border mt-5"
          onClick={() =>
            fetchDataFromJamendo<Track[]>(
              "tracks",
              { limit: "10", featured: 1 },
              dispatch,
              setTracksFromApi
            )
          }
        >
          Fetch featured tracks from Jamendo
        </button>

        <Featured entity={EntityType.Albums} />
        <Featured entity={EntityType.Tracks} />
      </div>
    </>
  );
};

export default Home;
