import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAlbums, setFeaturedTracks } from "../stores/musicStore/musicSlice";
import { Album } from "../models/AlbumResponse";
import { fetchDataFromJamendo } from "../utils/http";
import { Featured } from "../components/Featured";
import { EntityType } from "../components/Featured";
import { Track } from "../models/TracksResponse";
import GenreSelector from "../components/GenreSelector";
import { Favorites } from "../components/Favorites";
import { AppDispatch, RootState } from "../stores/configureStore";
import { fetchPlaylists } from "../stores/userStore/userThunk";

const Home = () => {
  const [albumError, setAlbumError] = useState<string>("");
  const [trackError, setTrackError] = useState<string>("");

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchPlaylists());
    }
  }, [dispatch, isAuthenticated]);

  //Todo, lägg error på ett bra ställe där datat hämtas.. PLUS att alla sidor som hämtar data lär ha ett error-state som sen skrivs ut

  return (
    <>
      <div className="home wrapper">
        <h2 className="text-4xl font-bold tracking-wider">Welcome back!</h2>
        <p className="tracking-wide mt-2">Explore new music everyday</p>

        <button
          className="bold border mt-5"
          onClick={() =>
            fetchDataFromJamendo<Album[], Album[]>(
              "albums",
              { limit: "10", featured: 1 },
              dispatch,
              setAlbums,
              setAlbumError
            )
          }
        >
          Fetch featured albums from Jamendo
        </button>
        <button
          className="bold border mt-5"
          onClick={() =>
            fetchDataFromJamendo<Track[], Track[]>(
              "tracks",
              { limit: "10", featured: 1 },
              dispatch,
              setFeaturedTracks,
              setTrackError
            )
          }
        >
          Fetch featured tracks from Jamendo
        </button>

        {albumError ? (
          <div className="flex flex-col w-full mb-4">
            <h3 className="font-semibold text-2xl tracking-wide mb-4">
              Featured Albums
            </h3>
            <p>Could not load albums</p>
          </div>
        ) : (
          <Featured entity={EntityType.Albums} />
        )}
        {trackError ? (
          <div className="flex flex-col w-full">
            <h3 className="font-semibold text-2xl tracking-wide mb-4">
              Featured Tracks
            </h3>
            <p>Could not load tracks</p>
          </div>
        ) : (
          <Featured entity={EntityType.Tracks} />
        )}
        {isAuthenticated && <Favorites />}
        <GenreSelector />
      </div>
    </>
  );
};

export default Home;
