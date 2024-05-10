import { fetchDataFromJamendo } from "../../utils/http";
import { useDispatch, useSelector } from "react-redux";
import { setFeaturedTracks } from "../../stores/musicStore/musicSlice";
import { RootState } from "../../stores/configureStore";
import { Track } from "../../models/TracksResponse";
import AlbumDisplay from "../../components/AlbumDisplay";

const Songs = () => {
  const dispatch = useDispatch();
  const tracks = useSelector(
    (state: RootState) => state.musicInStore.featuredTracks
  );

  return (
    <>
      <div className="trackspage wrapper">
        <h2 className="text-4xl font-bold tracking-wider">Popular songs</h2>
        <p className="tracking-wide mt-2">Explore new music everyday</p>

        <button
          className="bold border mt-5"
          onClick={() =>
            fetchDataFromJamendo<Track[], Track[]>(
              "tracks",
              { limit: "20", featured: 1 },
              dispatch,
              setFeaturedTracks
            )
          }
        >
          Fetch tracks from Jamendo
        </button>

        <div className="flex flex-wrap gap-5 w-full">
          {tracks.map((data) => (
            <AlbumDisplay data={data} basePath="track" key={data.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Songs;
