import { useLocation } from "react-router-dom";
import { Playlist } from "../../models/PlaylistResponse";
import { useEffect, useState } from "react";
import { fetchDataFromJamendo } from "../../utils/http";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../stores/configureStore";
import {
  setCurrentPlaylist,
  setTracksToPlay,
  setPlayStatus,
} from "../../stores/musicStore/musicSlice";
import { IoPlay } from "react-icons/io5";
import { formatTime } from "../../utils/helperFunctions";
import { Track } from "../../models/TracksResponse";
import { Error } from "../../components/Error";
import { Tracklist } from "../../components/Tracklist";

const PlaylistPage = () => {
  const [error, setError] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();
  const { state } = useLocation();
  const publicPlaylist = useSelector(
    (state: RootState) => state.musicStore.currentPlaylist
  );

  useEffect(() => {
    if (state.type === "Public") {
      fetchDataFromJamendo<Playlist[]>(
        "playlists/tracks",
        { id: Number(state.data.id) },
        dispatch,
        setCurrentPlaylist,
        setError
      );
    }
  }, [state]);

  const handlePlay = (index: number) => {
    let tracks: Track[];
    if (state.type === "Public" && publicPlaylist.tracks) {
      tracks = publicPlaylist.tracks;
      dispatch(setTracksToPlay({ tracks, index }));
      dispatch(setPlayStatus(true));
    } else if (state.type === "Private") {
      tracks = state.data.tracks;
      dispatch(setTracksToPlay({ tracks, index }));
      dispatch(setPlayStatus(true));
    }
  };

  return (
    <div className="playlist wrapper">
      {error ? (
        <Error message={error} />
      ) : (
        <>
          <h2 className="text-4xl font-bold tracking-wider">
            {state.data.name}
          </h2>
          <p>
            {state.type === "Public"
              ? publicPlaylist && publicPlaylist.tracks
                ? publicPlaylist.tracks.length
                : "0"
              : state.type === "Private" && state.data && state.data.tracks
              ? state.data.tracks.length
              : "0"}{" "}
            tracks
          </p>

          <h3>Tracklist</h3>

          <div>
            {state.type === "Public" &&
              publicPlaylist &&
              publicPlaylist.tracks && (
                <Tracklist tracks={publicPlaylist.tracks} />
              )}

            {state.type === "Private" && state.data && state.data.tracks && (
              <Tracklist tracks={state.data.tracks} />
            )}

            {/* <table className="min-w-full divide-y divide-gray-500">
              <thead>
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
                {state.type === "Public" &&
                publicPlaylist &&
                publicPlaylist.tracks ? (
                  publicPlaylist.tracks.map((track, index) => (
                    <tr key={track.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <IoPlay
                            className="cursor-pointer hover:scale-150 text-3xl h-5 w-5 text-teal"
                            aria-hidden="true"
                            onClick={() => handlePlay(index)}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formatTime(track.duration)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {track.name}
                      </td>
                    </tr>
                  ))
                ) : state.type === "Private" &&
                  state.data &&
                  state.data.tracks ? (
                  state.data.tracks.map((track: Track, index: number) => (
                    <tr key={track.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <IoPlay
                            className="cursor-pointer hover:scale-150 text-3xl h-5 w-5 text-teal"
                            aria-hidden="true"
                            onClick={() => handlePlay(index)}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formatTime(track.duration)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {track.name}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-4 text-center">
                      No data to present...
                    </td>
                  </tr>
                )}
              </tbody>
            </table> */}
          </div>
        </>
      )}
    </div>
  );
};

export default PlaylistPage;
