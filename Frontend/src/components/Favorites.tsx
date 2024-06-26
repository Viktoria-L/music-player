import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../stores/configureStore";
import { Track } from "../models/TracksResponse";
import { Link } from "react-router-dom";
import AlbumDisplay from "./AlbumDisplay";
import { fetchFavorites } from "../stores/userStore/userThunk";
import { useEffect } from "react";

export const Favorites = () => {
  const tracks: Track[] = useSelector(
    (state: RootState) => state.user.favorites
  );
  const dispatch: AppDispatch = useDispatch();
  const basePath: string = "track";

  useEffect(() => {
    dispatch(fetchFavorites());
  }, []);

  return (
    <div className="mt-8">
      <div className="flex justify-between w-full items-center">
        <h3 className="font-semibold text-2xl tracking-wide mb-5">
          Your Favorite Tracks
        </h3>
        <Link
          to="/favorites"
          state={{ basePath, tracks }}
          className="text-orange font-semibold text-[10px] md:text-sm"
        >
          Show all
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full">
        {tracks.slice(0, 5).map((data) => (
          <AlbumDisplay
            key={data.id}
            data={data}
            basePath={basePath}
            display="grid"
          />
        ))}
      </div>
    </div>
  );
};
