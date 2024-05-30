import { fetchDataFromJamendo } from "../../utils/http";
import { useDispatch, useSelector } from "react-redux";
import { setArtists } from "../../stores/musicStore/musicSlice";
import { RootState } from "../../stores/configureStore";
import { Link } from "react-router-dom";
import { Artist } from "../../models/ArtistsResponse";
import { useEffect, useState } from "react";
import { Error } from "../../components/Error";

const Artists = () => {
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const artists = useSelector((state: RootState) => state.musicStore.artists);

  useEffect(() => {
    if (artists.length === 0) {
      fetchDataFromJamendo<Artist[]>(
        "artists",
        { limit: "40" },
        dispatch,
        setArtists,
        setError
      );
    }
  }, []);

  return (
    <>
      <div className="artistspage wrapper">
        <h2 className="text-4xl font-bold tracking-wider">Popular artists</h2>
        <p className="tracking-wide mt-2 mb-8">Explore new artists here</p>

        {error ? (
          <Error message={error} />
        ) : (
          <div className="flex flex-wrap gap-5 w-full">
            {artists.map((data) => {
              if (data.image) {
                return (
                  <div key={data.id} className="w-48">
                    <div className="w-48 relative">
                      <img
                        src={data.image}
                        className="h-48 w-48 rounded-full"
                      ></img>
                    </div>

                    <Link to={`/artist/${data.name}`} state={data}>
                      <p className="text-wrap text-center mt-2">{data.name}</p>
                    </Link>
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Artists;
