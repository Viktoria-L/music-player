import { useLocation, useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchDataFromJamendo } from "../../utils/http";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../stores/configureStore";
import {
  setTracksToPlay,
  setPlayStatus,
  setArtistTracks,
  setArtistAlbums,
} from "../../stores/musicStore/musicSlice";
import { IoPlay } from "react-icons/io5";
import { formatTime } from "../../utils/helperFunctions";
import { Artist } from "../../models/ArtistsResponse";
import { Track } from "../../models/TracksResponse";

const ArtistPage = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const tracks = useSelector((state: RootState) => state.musicInStore.tracks);
  const artistTracks = useSelector(
    (state: RootState) => state.musicInStore.artistTracks.tracks
  );
  const artistAlbums = useSelector(
    (state: RootState) => state.musicInStore.artistAlbums.albums
  );

  useEffect(() => {
    if (state) {
      fetchDataFromJamendo<Artist[], Artist[]>(
        "artists/tracks",
        { id: state.id, limit: "10" },
        dispatch,
        setArtistTracks
      );
      fetchDataFromJamendo<Artist[], Artist[]>(
        "artists/albums",
        { id: state.id },
        dispatch,
        setArtistAlbums
      );
    }
  }, [state]);

  useEffect(() => {
    console.log("artist", artistTracks);
    console.log("album", artistAlbums);
  }, [artistTracks, artistAlbums]);

  const handlePlay = (index: number) => {
    if (artistTracks) {
      const tracks: Track[] = artistTracks;
      dispatch(setTracksToPlay({ tracks, index }));
      dispatch(setPlayStatus(true));
    }
  };

  // if (error) return <div>Error: {error}</div>;

  return (
    <div className="albumpage wrapper">
      <h2 className="text-4xl font-bold tracking-wider">Artistpage</h2>
      {(state || tracks) && (
        <>
          <div className="my-5 flex items-end gap-5">
            <img src={state.image} className="w-64 h-64"></img>
            <div className="flex flex-col justify-start items-start">
              <h2 className="text-4xl font-bold tracking-wider">
                {state.name}
              </h2>
              <p className="text-center mt-2 text-xl">{state.artist_name}</p>
            </div>
          </div>
          <h3>Tracklist</h3>
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
                {artistTracks &&
                  artistTracks.map((track, index) => (
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        {track.name}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col flex-wrap gap-5 w-full">
            <h3>Albums</h3>
            {artistAlbums &&
              artistAlbums.map((data) => (
                <div key={data.id} className="w-48">
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
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ArtistPage;
