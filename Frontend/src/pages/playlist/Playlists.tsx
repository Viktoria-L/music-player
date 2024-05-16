import { fetchDataFromJamendo } from "../../utils/http";
import { useDispatch, useSelector } from "react-redux";
import { Playlist } from "../../models/PlaylistResponse";
import { setPlaylists } from "../../stores/musicStore/musicSlice";
import { AppDispatch, RootState } from "../../stores/configureStore";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { playlist } from "../../assets/image/images";
import {
  createPlaylist,
  fetchPlaylists,
} from "../../stores/userStore/userThunk";
import { Error } from "../../components/Error";

const Playlists = () => {
  const [playlistName, setPlaylistName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();
  const playlists = useSelector(
    (state: RootState) => state.musicStore.playlists
  );
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const userPlaylists = useSelector((state: RootState) => state.user.playlists);
  const favorites = useSelector((state: RootState) => state.user.favorites);

  useEffect(() => {
    if (playlists.length === 0) {
      fetchDataFromJamendo<Playlist[]>(
        "playlists",
        { limit: "5" },
        dispatch,
        setPlaylists,
        setError
      );
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchPlaylists());
    }
  }, [isAuthenticated]);

  const handleCreate = async () => {
    await dispatch(createPlaylist(playlistName));
    dispatch(fetchPlaylists());
  };

  return (
    <>
      <div className="playslists wrapper">
        <h2 className="text-4xl font-bold tracking-wider">Popular playlists</h2>
        <p className="tracking-wide mt-2">Explore new music everyday</p>

        {error ? (
          <Error message={error} />
        ) : (
          <>
            <div className="flex flex-wrap w-full">
              {playlists.map((data) => (
                <div key={data.id} className="p-3 hover:bg-red-400 rounded-xl">
                  <div className="w-48">
                    <div className="w-48 relative">
                      <img
                        src={playlist}
                        className="h-48 w-48 rounded-[46px]"
                      ></img>
                    </div>

                    <Link
                      to={`/playlist/${data.id}`}
                      state={{ data: data, type: "Public" }}
                    >
                      <p className="text-wrap mt-2">{data.name}</p>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="text-xl bold">
          {isAuthenticated && userPlaylists && (
            <>
              <h2>Your playlists</h2>
              <div className="flex flex-wrap w-full">
                <div className="p-3 hover:bg-red-400 rounded-xl">
                  <div className="w-48">
                    <div className="w-48 relative">
                      <img
                        src={playlist}
                        className="h-48 w-48 rounded-xl"
                      ></img>
                    </div>

                    <Link to={`/favorites`}>
                      <p className="text-wrap mt-2">Your favorites</p>
                    </Link>
                    {favorites &&
                      favorites.map((track) => (
                        <p key={track.id}>Track: {track.name}</p>
                      ))}
                  </div>
                </div>

                {userPlaylists.map((list) => (
                  <div
                    key={list._id}
                    className="p-3 hover:bg-red-400 rounded-xl"
                  >
                    <div className="w-48">
                      <div className="w-48 relative">
                        <img
                          src={playlist}
                          className="h-48 w-48 rounded-xl"
                        ></img>
                      </div>

                      <Link
                        to={`/playlist/${list._id}`}
                        state={{ data: list, type: "Private" }}
                      >
                        <p className="text-wrap mt-2">{list.name}</p>
                      </Link>
                      {list.tracks &&
                        list.tracks.map((track) => (
                          <p key={track.id}>Track: {track.name}</p>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {isAuthenticated && (
            <div className="mt-5 flex flex-col gap-4">
              <button onClick={handleCreate}>Create new playlist</button>
              <input
                className="bg-teal"
                type="text"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                placeholder="Choose playlist name"
              />
              <p>{playlistName}</p>
              <button className="bg-teal border" onClick={handleCreate}>
                Create
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Playlists;
