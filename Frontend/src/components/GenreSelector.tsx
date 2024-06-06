import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../stores/configureStore";
import { fetchDataFromJamendo } from "../utils/http";
import { Track } from "../models/TracksResponse";
import { setGenreTracks } from "../stores/musicStore/musicSlice";
import AlbumDisplay from "./AlbumDisplay";

const GenreSelector = () => {
  const dispatch: AppDispatch = useDispatch();
  const [trackError, setTrackError] = useState<string>("");
  const [parameter, setParameter] = useState<string>("");

  const genreTracks = useSelector(
    (state: RootState) => state.musicStore.genreTracks
  );

  useEffect(() => {
    fetchDataFromJamendo<Track[]>(
      "tracks",
      { limit: "10", featured: 1, groupby: "artist_id", tags: parameter },
      dispatch,
      setGenreTracks,
      setTrackError
    );
  }, [parameter]);

  return (
    <div className="mt-8">
      <div className="flex justify-between w-full items-center">
        <h3 className="font-semibold text-2xl tracking-wide mb-4">
          Find your genre
        </h3>
        <Link
          to="/featured"
          state={{}}
          className="text-orange font-semibold text-[10px] md:text-sm"
        >
          Show all
        </Link>
      </div>
      <div className="flex gap-4 flex-wrap mb-4">
        <span
          className="cursor-pointer rounded-full text-sm bold py-1 px-3 self-start bg-orange text-white"
          onClick={() => setParameter("electronic")}
        >
          Electronic
        </span>
        <span
          className="cursor-pointer rounded-full text-sm bold py-1 px-3 self-start bg-orange text-white"
          onClick={() => setParameter("techno")}
        >
          Techno
        </span>
        <span
          className="cursor-pointer rounded-full text-sm bold py-1 px-3 self-start bg-orange text-white"
          onClick={() => setParameter("house")}
        >
          House
        </span>
        <span
          className="cursor-pointer rounded-full text-sm bold py-1 px-3 self-start bg-orange text-white"
          onClick={() => setParameter("pop")}
        >
          Pop
        </span>
        <span
          className="cursor-pointer rounded-full text-sm bold py-1 px-3 self-start bg-orange text-white"
          onClick={() => setParameter("rock")}
        >
          Rock
        </span>
        <span
          className="cursor-pointer rounded-full text-sm bold py-1 px-3 self-start bg-orange text-white"
          onClick={() => setParameter("hiphop")}
        >
          Hiphop
        </span>
        <span
          className="cursor-pointer rounded-full text-sm bold py-1 px-3 self-start bg-orange text-white"
          onClick={() => setParameter("trance")}
        >
          Trance
        </span>
        <span
          className="cursor-pointer rounded-full text-sm bold py-1 px-3 self-start bg-orange text-white"
          onClick={() => setParameter("reggae")}
        >
          Reggae
        </span>
        <span
          className="cursor-pointer rounded-full text-sm bold py-1 px-3 self-start bg-orange text-white"
          onClick={() => setParameter("metal")}
        >
          Metal
        </span>
      </div>
      <div className="flex flex-wrap w-full">
        {trackError ? (
          <div className="flex flex-col w-full">
            <p>Could not load tracks.</p>
          </div>
        ) : (
          genreTracks &&
          genreTracks.length > 0 &&
          genreTracks.map((track) => (
            <AlbumDisplay data={track} basePath={"track"} display={"flex"} />
          ))
        )}
      </div>
    </div>
  );
};

export default GenreSelector;
