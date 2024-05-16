import { fetchDataFromJamendo } from "../../utils/http";
import { useDispatch, useSelector } from "react-redux";
import { Album } from "../../models/AlbumResponse";
import { setAlbums } from "../../stores/musicStore/musicSlice";
import { RootState } from "../../stores/configureStore";
import { Link } from "react-router-dom";
import { IoPlay } from "react-icons/io5";
import { Error } from "../../components/Error";
import { useEffect, useState } from "react";
import AlbumDisplay from "../../components/AlbumDisplay";

const Albums = () => {
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const albums = useSelector((state: RootState) => state.musicStore.albums);

  useEffect(() => {
    if (albums.length === 0) {
      fetchDataFromJamendo<Album[]>(
        "albums",
        { limit: "20" },
        dispatch,
        setAlbums,
        setError
      );
    }
  }, []);

  return (
    <>
      <div className="albumspage wrapper">
        <h2 className="text-4xl font-bold tracking-wider">Popular albums</h2>
        <p className="tracking-wide mt-2">Explore new albums everyday</p>
        {error ? (
          <Error message={error} />
        ) : (
          <div className="flex flex-wrap w-full">
            {albums.map((data) => (
              <div key={data.id} className="p-3 hover:bg-grey rounded-xl">
                <div className="w-48">
                  <div className="w-48 relative">
                    <IoPlay className="cursor-pointer text-6xl absolute right-1 bottom-1" />
                    <img
                      src={data.image}
                      className="h-48 w-48 rounded-xl"
                    ></img>
                  </div>

                  <Link to={`/album/${data.id}`} state={data}>
                    <p className="text-wrap mt-2">{data.name}</p>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Albums;
