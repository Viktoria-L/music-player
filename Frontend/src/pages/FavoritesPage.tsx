import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IoPlay } from "react-icons/io5";
import { Track } from "../models/TracksResponse";
import AlbumDisplay from "../components/AlbumDisplay";
import { useSelector } from "react-redux";
import { RootState } from "../stores/configureStore";

const FavoritesPage = () => {
  const { state } = useLocation();
  const tracks = useSelector((state: RootState) => state.user.favorites);

  return (
    <>
      <div className="favoritespage wrapper">
        <h2 className="text-4xl font-bold tracking-wider">
          Your favorite tracks
        </h2>

        <div className="flex flex-wrap my-8 gap-10 w-full">
          {tracks.map((data: Track) => (
            <AlbumDisplay data={data} basePath="track" />
          ))}
        </div>
      </div>
    </>
  );
};

export default FavoritesPage;
