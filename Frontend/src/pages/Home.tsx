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
  const [error, setError] = useState<string>("");
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const dispatch: AppDispatch = useDispatch();
  // const data = useSelector((state: RootState) => state.musicInStore.tracks);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchPlaylists());
    }
  }, [dispatch, isAuthenticated]);

  //Todo, lägg error på ett bra ställe där datat hämtas.. PLUS att alla sidor som hämtar data lär ha ett error-state som sen skrivs ut
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="home wrapper">
        <h2 className="text-4xl font-bold tracking-wider">Welcome back!</h2>
        <p className="tracking-wide mt-2">Explore new music everyday</p>

        <button
          className="bold border mt-5"
          onClick={() =>
            fetchDataFromJamendo<Album[], Album[]>(
              "albumkkiks",
              { limit: "10", featured: 1 },
              dispatch,
              setAlbums,
              setError
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
              setError
            )
          }
        >
          Fetch featured tracks from Jamendo
        </button>

        <Featured entity={EntityType.Albums} />
        <Featured entity={EntityType.Tracks} />
        {isAuthenticated && <Favorites />}
        <GenreSelector />
      </div>
    </>
  );
};

export default Home;
