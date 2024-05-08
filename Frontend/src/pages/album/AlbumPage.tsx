import { useLocation, useParams } from "react-router-dom";
import { Tracklist } from "../../components/Tracklist";
import { useEffect } from "react";
import { fetchDataFromJamendo } from "../../utils/http";
import { setCurrentAlbum } from "../../stores/musicStore/musicSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores/configureStore";

const AlbumPage = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();

  const album = useSelector(
    (state: RootState) => state.musicInStore.currentAlbum
  );

  useEffect(() => {
    if (id) {
      fetchDataFromJamendo(
        `albums/tracks`,
        { id: id },
        dispatch,
        setCurrentAlbum
      );
    }
  }, [id]);

  return (
    <div className="albumpage wrapper">
      <h2 className="text-4xl font-bold tracking-wider">Albumpage</h2>
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

export default AlbumPage;
