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
  //const favorites = useSelector((state: RootState) => state.user.favorites);

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
    if (playlistName) {
      await dispatch(createPlaylist(playlistName));
      dispatch(fetchPlaylists());
    }
    setPlaylistName("");
  };

  return (
    <>
      <div className="playslists wrapper">
        <h2 className="text-4xl font-bold tracking-wider">Popular playlists</h2>
        <p className="tracking-wide mt-2 mb-8">
          Explore new playlists everyday
        </p>

        {error ? (
          <Error message={error} />
        ) : (
          <>
            <div className="flex flex-wrap w-full">
              {playlists.map((data) => (
                <div key={data.id} className="p-3 hover:bg-grey rounded-xl">
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
                      <p className="pl-3 text-wrap mt-2">{data.name}</p>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="mt-8">
          {isAuthenticated && userPlaylists && (
            <>
              <h2 className="font-semibold text-orange text-xl mb-8">
                Your playlists
              </h2>
              <div className="flex flex-wrap w-full">
                <div className="p-3 hover:bg-grey rounded-xl">
                  <div className="w-48">
                    <div className="w-48 relative">
                      <img
                        src={playlist}
                        className="h-48 w-48 rounded-[46px]"
                      ></img>
                    </div>

                    <Link to={`/favorites`}>
                      <p className="pl-3 text-wrap mt-2">Your favorites</p>
                    </Link>
                    {/* {favorites &&
                      favorites.map((track) => (
                        <p key={track.id}>Track: {track.name}</p>
                      ))} */}
                  </div>
                </div>

                {userPlaylists.map((list) => (
                  <div key={list._id} className="p-3 hover:bg-grey rounded-xl">
                    <div className="w-48">
                      <div className="w-48 relative">
                        <img
                          src={playlist}
                          className="h-48 w-48 rounded-[46px]"
                        ></img>
                      </div>

                      <Link
                        to={`/playlist/${list._id}`}
                        state={{ data: list, type: "Private" }}
                      >
                        <p className="pl-3 text-wrap mt-2">{list.name}</p>
                      </Link>
                      {/* {list.tracks &&
                        list.tracks.map((track) => (
                          <p key={track.id}>Track: {track.name}</p>
                        ))} */}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {isAuthenticated && (
            <div className="mt-5 flex flex-col gap-2 mb-8 max-w-[345px]">
              <h3>Create new playlist</h3>
              <input
                className="bg-grey rounded-md"
                type="text"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                placeholder=" Choose playlist name"
              />

              <button className="bg-orange rounded-full" onClick={handleCreate}>
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
