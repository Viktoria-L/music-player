import { fetchDataFromJamendo } from "../../utils/http";
import { useDispatch, useSelector } from "react-redux";
import { Playlist } from "../../models/PlaylistResponse";
import { setPlaylists } from "../../configureStore/musicSlice";
import { RootState } from "../../configureStore/configureStore";
import { Link } from "react-router-dom";
import { IoPlay } from "react-icons/io5";
import { useState } from "react";
import { playlist } from "../../assets/image/images";
import { createPlaylist } from "../../utils/helperFunctions";
//Todo, lägg in playlistbild..

const Playlists = () => {
  const [playlistName, setPlaylistName] = useState<string>("");
  const dispatch = useDispatch();
  const playlists = useSelector(
    (state: RootState) => state.musicInStore.playlists
  );

  const handleCreate = () => {};

  return (
    <>
      <div className="home flex flex-grow flex-col mt-8 sm:px-8 px-4">
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

        <button onClick={handleCreate}>Create new playlist</button>
        <input
          className="bg-teal"
          type="text"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          placeholder="Choose playlist name"
        />
        <p>{playlistName}</p>
        <button
          className="bg-teal border"
          onClick={() => createPlaylist({ name: playlistName })}
        >
          Create
        </button>
        <div className="text-xl bold">Your playlists</div>
      </div>
    </>
  );
};

export default Playlists;
