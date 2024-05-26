import { useLocation } from "react-router-dom";
import { Playlist } from "../../models/PlaylistResponse";
import { useEffect, useState } from "react";
import { fetchDataFromJamendo } from "../../utils/http";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../stores/configureStore";
import { setCurrentPlaylist } from "../../stores/musicStore/musicSlice";

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
          </div>
        </>
      )}
    </div>
  );
};

export default PlaylistPage;
