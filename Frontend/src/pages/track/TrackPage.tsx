import { useLocation } from "react-router-dom";
import { IoPlay } from "react-icons/io5";
import { useEffect } from "react";
import { fetchDataFromJamendo } from "../../utils/http";
import {
  setCurrentTrack,
  setPlayStatus,
  setSingleTrack,
} from "../../stores/musicStore/musicSlice";
import { formatTime } from "../../utils/helperFunctions";
import { useDispatch } from "react-redux";
import { Track } from "../../models/TracksResponse";

const TrackPage = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();

  //TODO, lägg in så man kan spela hela albumet med och laddar in tracks i tracksfrom api
  useEffect(() => {
    if (state) {
      console.log("state", state);
      fetchDataFromJamendo(
        `tracks`,
        { id: state.id, artist_name: state.artist_name },
        dispatch,
        setSingleTrack
      );
    }
  }, [state, dispatch]);

  const handlePlay = (data: Track) => {
    dispatch(setCurrentTrack(data));
    dispatch(setPlayStatus(true));
  };

  //Todo lägg till bakåtknapp överst på sidan, ovanför albumnamn eller vad det ska stå först
  //Bakåtknappen måste återställa currentAlbum till ingenting ifall man går tillbaka, dock inte current track
  // eller nä ska man återställa currentalbum, eftersom playern ska köras även om jag navigerar mig runt..

  return (
    <div className="home flex flex-grow flex-col mt-8 sm:px-8 px-4">
      <h2 className="text-4xl font-bold tracking-wider">Trackpage</h2>
      <div className="my-5 flex items-end gap-5">
        <img src={state.image} className="w-64 h-64"></img>
        <div className="flex flex-col justify-start items-start">
          <h2 className="text-4xl font-bold tracking-wider">{state.name}</h2>
          <p className="text-center mt-2 text-xl">{state.artist_name}</p>
        </div>
      </div>
      <h3>Tracklist</h3>
      <div>
        <table className="min-w-full divide-y divide-gray-500">
          <thead className="">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Play
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Duration
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-500">
            {state && (
              // tracks.map((track) => (
              <tr key={state.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <IoPlay
                      className="cursor-pointer hover:scale-150 text-3xl h-5 w-5 text-teal"
                      aria-hidden="true"
                      onClick={() => handlePlay(state)}
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatTime(state.duration)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{state.name}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrackPage;
