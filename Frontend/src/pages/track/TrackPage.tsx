import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchDataFromJamendo } from "../../utils/http";
import { setSingleTrack } from "../../stores/musicStore/musicSlice";
import { useDispatch } from "react-redux";
import { Track } from "../../models/TracksResponse";
import { Error } from "../../components/Error";
import { AppDispatch } from "../../stores/configureStore";
import { Tracklist } from "../../components/Tracklist";

const TrackPage = () => {
  const [error, setError] = useState<string>("");
  const { state } = useLocation();

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (state) {
      fetchDataFromJamendo<Track>(
        `tracks`,
        { id: state.id, artist_name: state.artist_name },
        dispatch,
        setSingleTrack,
        setError
      );
    }
  }, [state, dispatch]);

  return (
    <div className="track wrapper">
      {/* <h2 className="text-4xl font-bold tracking-wider">Trackpage</h2> */}
      {error ? (
        <Error message={error} />
      ) : (
        <>
          <div className="my-5 flex items-end gap-5">
            <img src={state.image} className="image"></img>
            <div className="flex flex-col justify-start items-start">
              <h2 className="text-4xl font-bold tracking-wider">
                {state.name}
              </h2>
              <p className="text-center mt-2 text-xl">{state.artist_name}</p>
            </div>
          </div>
          <h3>Tracklist</h3>
          <div>
            <Tracklist tracks={[state]} />
          </div>
        </>
      )}
    </div>
  );
};

export default TrackPage;
