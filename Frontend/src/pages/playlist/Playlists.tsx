import { fetchDataFromJamendo } from "../../utils/http";
import { useDispatch, useSelector } from "react-redux";
import { Playlist } from "../../models/PlaylistResponse";
import { setPlaylists } from "../../stores/musicStore/musicSlice";
import { AppDispatch, RootState } from "../../stores/configureStore";
import { Link } from "react-router-dom";
import { IoPlay } from "react-icons/io5";
import { useEffect, useState } from "react";
import { playlist } from "../../assets/image/images";
import {
  createPlaylist,
  fetchPlaylists,
} from "../../stores/userStore/userThunk";

//Todo, lägg in nån bra playlistbild..

const Playlists = () => {
  const [playlistName, setPlaylistName] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();
  const playlists = useSelector(
    (state: RootState) => state.musicInStore.playlists
  );
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const userPlaylists = useSelector((state: RootState) => state.user.playlists);

  const handleCreate = async () => {
    await dispatch(createPlaylist(playlistName));
    dispatch(fetchPlaylists());
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchPlaylists());
    }
  }, [isAuthenticated]);

  return (
    <>
      <div className="playslists wrapper">
        <h2 className="text-4xl font-bold tracking-wider">Popular playlists</h2>
        <p className="tracking-wide mt-2">Explore new music everyday</p>

        <button
          className="bold border mt-5"
          onClick={() =>
            fetchDataFromJamendo<Playlist[], Playlist[]>(
              "playlists",
              { limit: "5" },
              dispatch,
              setPlaylists
            )
          }
        >
          Fetch featured playlists from Jamendo
        </button>

        <div className="flex flex-wrap gap-5 w-full">
          {playlists.map((data) => (
            <div key={data.id} className="w-48">
              <div className="w-48 relative">
                <IoPlay className="cursor-pointer text-6xl absolute right-1 bottom-1" />
                <img src={playlist} className="h-48 w-48 rounded-xl"></img>
              </div>

              <Link to={`/playlist/${data.id}`} state={data}>
                <p className="text-wrap mt-2">{data.name}</p>
              </Link>
            </div>
          ))}
        </div>

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

        <div className="text-xl bold">
          <h2>Your playlists</h2>
          <div className="flex flex-wrap gap-5 w-full">
            {isAuthenticated &&
              userPlaylists &&
              userPlaylists.map((list, i) => (
                <div key={i} className="w-48">
                  <div className="w-48 relative">
                    <IoPlay className="cursor-pointer text-6xl absolute right-1 bottom-1" />
                    <img src={playlist} className="h-48 w-48 rounded-xl"></img>
                  </div>

                  <Link to={`/playlist/${list._id}`} state={list}>
                    <p className="text-wrap mt-2">{list.name}</p>
                  </Link>
                  {list.tracks &&
                    list.tracks.map((track) => <p>Track: {track.name}</p>)}
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Playlists;
