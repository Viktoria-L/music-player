import { fetchDataFromJamendo } from "../../utils/http";
import { useDispatch, useSelector } from "react-redux";
import { setArtists } from "../../stores/musicStore/musicSlice";
import { RootState } from "../../stores/configureStore";
import { Link } from "react-router-dom";
import { Artist } from "../../models/ArtistsResponse";

const Artists = () => {
  const dispatch = useDispatch();
  const artists = useSelector((state: RootState) => state.musicStore.artists);

  return (
    <>
      <div className="artistspage wrapper">
        <h2 className="text-4xl font-bold tracking-wider">Popular artists</h2>
        <p className="tracking-wide mt-2">Explore new music everyday</p>

        <button
          className="bold border mt-5"
          onClick={() =>
            fetchDataFromJamendo<Artist[], Artist[]>(
              "artists",
              { limit: "20" },
              dispatch,
              setArtists
            )
          }
        >
          Fetch artists from Jamendo
        </button>

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
      </div>
    </>
  );
};

export default Artists;
