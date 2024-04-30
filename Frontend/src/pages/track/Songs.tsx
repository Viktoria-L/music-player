import { fetchDataFromJamendo } from "../../utils/http";
import { useDispatch, useSelector } from "react-redux";
import { Album } from "../../models/AlbumResponse";
import { setTracksFromApi } from "../../stores/musicStore/musicSlice";
import { RootState } from "../../stores/configureStore";
import { Link } from "react-router-dom";
import { IoPlay } from "react-icons/io5";
import { Track } from "../../models/TracksResponse";

const Songs = () => {
  const dispatch = useDispatch();
  const tracks = useSelector((state: RootState) => state.musicInStore.tracks);

  return (
    <>
      <div className="home flex flex-grow flex-col mt-8 sm:px-8 px-4">
        <h2 className="text-4xl font-bold tracking-wider">Popular songs</h2>
        <p className="tracking-wide mt-2">Explore new music everyday</p>

        <button
          className="bold border mt-5"
          onClick={() =>
            fetchDataFromJamendo<Track[], { tracks: Track[]; index?: number }>(
              "tracks",
              { limit: "20", featured: 1 },
              dispatch,
              (tracks) => setTracksFromApi({ tracks })
            )
          }
        >
          Fetch tracks from Jamendo
        </button>

        <div className="flex flex-wrap gap-5 w-full">
          {tracks.map((data) => (
            <div key={data.id} className="w-48">
              <div className="w-48 relative">
                <IoPlay className="cursor-pointer text-6xl absolute right-1 bottom-1" />
                <img src={data.image} className="h-48 w-48 rounded-xl"></img>
              </div>

              <Link to={`/track/${data.id}`} state={data}>
                <p className="text-wrap mt-2">{data.name}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Songs;
