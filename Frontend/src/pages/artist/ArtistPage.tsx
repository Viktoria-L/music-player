import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchDataFromJamendo } from "../../utils/http";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../stores/configureStore";
import {
  setArtistTracks,
  setArtistAlbums,
} from "../../stores/musicStore/musicSlice";
import { Artist } from "../../models/ArtistsResponse";
import { Error } from "../../components/Error";
import { Tracklist } from "../../components/Tracklist";

const ArtistPage = () => {
  const [albumError, setAlbumError] = useState<string>("");
  const [trackError, setTrackError] = useState<string>("");
  const { state } = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const tracks = useSelector((state: RootState) => state.musicStore.tracks);
  const artistTracks = useSelector(
    (state: RootState) => state.musicStore.artistTracks?.tracks
  );
  const artistAlbums = useSelector(
    (state: RootState) => state.musicStore.artistAlbums?.albums
  );

  useEffect(() => {
    if (state) {
      fetchDataFromJamendo<Artist[]>(
        "artists/tracks",
        { id: state.joindate ? state.id : state.artist_id, limit: "10" },
        dispatch,
        setArtistTracks,
        setTrackError
      );
      if (state) {
        fetchDataFromJamendo<Artist[]>(
          "artists/albums",
          { id: state.joindate ? state.id : state.artist_id },
          dispatch,
          setArtistAlbums,
          setAlbumError
        );
      }
    }
  }, [state]);

  return (
    <div className="albumpage wrapper">
      {/* <h2 className="text-4xl font-bold tracking-wider">Artistpage</h2> */}
      {(state || tracks) && (
        <>
          <div className="my-5 flex items-end gap-5">
            <img src={state.image} className="image"></img>
            <div className="flex flex-col justify-start items-start">
              <h2 className="text-4xl font-bold tracking-wider">
                {state.name}
              </h2>
              <p className="text-center mt-2 text-xl">{state.artist_name}</p>
            </div>
          </div>
          <h3>Tracklist</h3>

          {trackError ? (
            <Error message={trackError} />
          ) : (
            <>{artistTracks && <Tracklist tracks={artistTracks} />}</>
          )}

          <h3 className="my-8">Albums</h3>
          {albumError ? (
            <Error message={trackError} />
          ) : (
            <div className="flex flex-wrap gap-5 w-full">
              {artistAlbums &&
                artistAlbums.slice(0, 10).map((data) => (
                  <div key={data.id} className="w-48">
                    <div className="w-48 relative">
                      {/* <IoPlay className="cursor-pointer text-6xl absolute right-1 bottom-1" /> */}
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
          )}
        </>
      )}
    </div>
  );
};

export default ArtistPage;
