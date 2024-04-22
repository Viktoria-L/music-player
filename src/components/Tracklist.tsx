import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../configureStore/configureStore";
import { IoPlay } from "react-icons/io5";
import { formatTime } from "../utils/helperFunctions";
import { setPlayStatus, setTracksFromApi } from "../configureStore/musicSlice";

export const Tracklist = () => {
  const dispatch = useDispatch();
  const tracks = useSelector(
    (state: RootState) => state.musicInStore.currentAlbum?.tracks
  );

  useEffect(() => {
    console.log("tracks", tracks);
  }, [tracks]);

  const handlePlay = (index: number) => {
    if (tracks) {
      dispatch(setTracksFromApi({ tracks, index }));
      dispatch(setPlayStatus(true));
    }
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
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-500">
          {tracks &&
            tracks.map((track, index) => (
              <tr key={track.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <IoPlay
                      className="cursor-pointer hover:scale-150 text-3xl h-5 w-5 text-teal"
                      aria-hidden="true"
                      onClick={() => handlePlay(index)}
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatTime(track.duration)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{track.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
