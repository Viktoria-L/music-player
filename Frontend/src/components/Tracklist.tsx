import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../stores/configureStore";
import { IoPlay } from "react-icons/io5";
import { formatTime } from "../utils/helperFunctions";
import {
  setPlayStatus,
  setTracksToPlay,
} from "../stores/musicStore/musicSlice";
import { Track } from "../models/TracksResponse";
import {
  addToFavorites,
  removeFromFavorites,
  fetchFavorites,
} from "../stores/userStore/userThunk";
import { GoHeart, GoHeartFill } from "react-icons/go";

interface TracklistProps {
  tracks: Track[];
}

export const Tracklist: React.FC<TracklistProps> = ({ tracks }) => {
  const dispatch: AppDispatch = useDispatch();
  // const tracks = useSelector(
  //   (state: RootState) => state.musicStore.currentAlbum?.tracks
  // );
  const favorites = useSelector((state: RootState) => state.user.favorites);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    console.log("tracks", tracks);
    console.log("favorites", favorites);
    console.log("isAuthenticated", isAuthenticated);
  }, [tracks, favorites, isAuthenticated]);

  const handlePlay = (index: number) => {
    if (tracks) {
      dispatch(setTracksToPlay({ tracks, index }));
      dispatch(setPlayStatus(true));
    }
  };

  const handleFavorite = async (data: Track) => {
    await dispatch(addToFavorites(data));
    dispatch(fetchFavorites());
  };

  const removeFavorite = async (id: string) => {
    await dispatch(removeFromFavorites(id));
    dispatch(fetchFavorites());
  };

  const isFavorite = (trackId: string) => {
    return favorites?.some((favorite) => favorite.id === trackId);
  };

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-500">
        <thead className="">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Play
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Duration
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {" "}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-500">
          {tracks &&
            tracks.map((track, index) => (
              <tr key={track.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <IoPlay
                      className="cursor-pointer hover:scale-150 text-3xl h-5 w-5 text-orange"
                      aria-hidden="true"
                      onClick={() => handlePlay(index)}
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatTime(track.duration)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{track.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {isAuthenticated && favorites && isFavorite(track.id) ? (
                    <GoHeartFill
                      key={track.id}
                      className="cursor-pointer text-2xl"
                      onClick={(e: React.MouseEvent<SVGElement>) => {
                        e.stopPropagation();
                        removeFavorite(track.id);
                      }}
                    />
                  ) : (
                    <GoHeart
                      className="cursor-pointer text-2xl"
                      onClick={(e: React.MouseEvent<SVGElement>) => {
                        e.stopPropagation();
                        handleFavorite(track);
                      }}
                    />
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
