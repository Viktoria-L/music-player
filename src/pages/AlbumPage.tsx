import { useLocation } from "react-router-dom";
import { Tracklist } from "../components/Tracklist";
import { useEffect } from "react";
import { fetchDataFromJamendo } from "../utils/http";
import { setCurrentAlbum } from "../configureStore/musicSlice";
import { useDispatch } from "react-redux";

const AlbumPage = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();

  //TODO, lägg in så man kan spela hela albumet med och laddar in trtacks i tracksfrom api

  useEffect(() => {
    if (state) {
      fetchDataFromJamendo(
        `albums/tracks`,
        { id: state.id, artist_name: state.artist_name },
        dispatch,
        setCurrentAlbum
      );
    }
  }, [state, dispatch]);

  //Todo lägg till bakåtknapp överst på sidan, ovanför albumnamn eller vad det ska stå först
  //Bakåtknappen måste återställa currentAlbum till ingenting ifall man går tillbaka, dock inte current track
  // eller nä ska man återställa currentalbum, eftersom playern ska köras även om jag navigerar mig runt..

  return (
    <div className="home flex flex-grow flex-col mt-8 sm:px-8 px-4">
      <h2 className="text-4xl font-bold tracking-wider">Albumpage</h2>
      <div className="my-5 flex items-end gap-5">
        <img src={state.image} className="w-64 h-64"></img>
        <div className="flex flex-col justify-start items-start">
          <h2 className="text-4xl font-bold tracking-wider">{state.name}</h2>
          <p className="text-center mt-2 text-xl">{state.artist_name}</p>
        </div>
      </div>
      <h3>Tracklist</h3>
      <Tracklist />
    </div>
  );
};

export default AlbumPage;
