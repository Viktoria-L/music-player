import { fetchDataFromJamendo } from "../../utils/http";
import { useDispatch, useSelector } from "react-redux";
import { Album } from "../../models/AlbumResponse";
import { setAlbums } from "../../stores/musicStore/musicSlice";
import { RootState } from "../../stores/configureStore";
import { Link } from "react-router-dom";
import { IoPlay } from "react-icons/io5";

const Albums = () => {
  const dispatch = useDispatch();
  const albums = useSelector((state: RootState) => state.musicInStore.albums);

  return (
    <>
      <div className="home flex flex-grow flex-col mt-8 sm:px-8 px-4">
        <h2 className="text-4xl font-bold tracking-wider">Popular albums</h2>
        <p className="tracking-wide mt-2">Explore new music everyday</p>

        <button
          className="bold border mt-5"
          onClick={() =>
            fetchDataFromJamendo<Album[], Album[]>(
              "albums",
              { limit: "20" },
              dispatch,
              setAlbums
            )
          }
        >
          Fetch featured albums from Jamendo
        </button>

        <div className="flex flex-wrap gap-5 w-full">
          {albums.map((data) => (
            <div key={data.id} className="w-48">
              <div className="w-48 relative">
                <IoPlay className="cursor-pointer text-6xl absolute right-1 bottom-1" />
                <img src={data.image} className="h-48 w-48 rounded-xl"></img>
              </div>

              <Link to={`/album/${data.id}`} state={data}>
                <p className="text-wrap mt-2">{data.name}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Albums;
