import { fetchDataFromJamendo } from "../../utils/http";
import { useDispatch, useSelector } from "react-redux";
import { setPopularTracks } from "../../stores/musicStore/musicSlice";
import { RootState } from "../../stores/configureStore";
import { Track } from "../../models/TracksResponse";
import AlbumDisplay from "../../components/AlbumDisplay";
import { useEffect, useState } from "react";
import { Error } from "../../components/Error";

const Songs = () => {
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const tracks = useSelector(
    (state: RootState) => state.musicStore.popularTracks
  );

  useEffect(() => {
    if (tracks.length === 0)
      fetchDataFromJamendo<Track[]>(
        "tracks",
        { limit: "20", featured: 1 },
        dispatch,
        setPopularTracks,
        setError
      );
  }, []);

  return (
    <>
      <div className="trackspage wrapper">
        <h2 className="text-4xl font-bold tracking-wider">Popular songs</h2>
        <p className="tracking-wide mt-2">Explore new music everyday</p>

        {error ? (
          <Error message={error} />
        ) : (
          <div className="flex flex-wrap w-full">
            {tracks.map((data) => (
              <AlbumDisplay
                data={data}
                basePath="track"
                key={data.id}
                display="flex"
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Songs;
