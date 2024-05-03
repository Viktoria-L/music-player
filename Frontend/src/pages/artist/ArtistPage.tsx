//TODO gör en sida likt albumPage
import { useLocation, useParams } from "react-router-dom";
import { Tracklist } from "../../components/Tracklist";
import { useEffect } from "react";
import { fetchDataFromJamendo } from "../../utils/http";
import { setCurrentAlbum } from "../../stores/musicStore/musicSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores/configureStore";

//Todo, byt ut allt album mot artist, PLUs
//TODO, kolla av hur datat på endpointen artist ser ut och rendera ut, utifrån det. visar den artistens album eller några låtar?

const ArtistPage = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();

  const album = useSelector(
    (state: RootState) => state.musicInStore.currentAlbum
  );

  //   useEffect(() => {
  //     if (state) {
  //       fetchDataFromJamendo(
  //         `albums/tracks`,
  //         { id: state.id, artist_name: state.artist_name },
  //         dispatch,
  //         setCurrentAlbum
  //       );
  //     } else if (!state) {
  //       console.log("inget state");
  //       fetchDataFromJamendo(
  //         `albums/tracks`,
  //         { id: id },
  //         dispatch,
  //         setCurrentAlbum
  //       );
  //     }
  //   }, []);

  return (
    <div className="albumpage wrapper">
      <h2 className="text-4xl font-bold tracking-wider">Artistpage</h2>
      {(state || album) && (
        <>
          <div className="my-5 flex items-end gap-5">
            <img
              src={state ? state.image : album?.image}
              className="w-64 h-64"
            ></img>
            <div className="flex flex-col justify-start items-start">
              <h2 className="text-4xl font-bold tracking-wider">
                {state ? state.name : album?.name}
              </h2>
              <p className="text-center mt-2 text-xl">
                {state ? state.artist_name : album?.artist_name}
              </p>
            </div>
          </div>
          <h3>Tracklist</h3>
          <Tracklist />
        </>
      )}
    </div>
  );
};

export default ArtistPage;
