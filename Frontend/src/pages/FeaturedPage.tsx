import { useLocation, Link } from "react-router-dom";
import { IoPlay, IoPause } from "react-icons/io5";
import { Album } from "../models/AlbumResponse";
import { Track } from "../models/TracksResponse";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentTrack,
  setPlayStatus,
} from "../stores/musicStore/musicSlice";
import { RootState } from "../stores/configureStore";

const FeaturedPage = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const currentTrack = useSelector(
    (state: RootState) => state.musicStore.currentTrack
  );
  const isSomethingPlaying = useSelector(
    (state: RootState) => state.musicStore.isPlaying
  );

  const handlePlay = (data: Track) => {
    dispatch(setCurrentTrack(data));
    dispatch(setPlayStatus(true));
  };

  const handlePause = () => {
    dispatch(setPlayStatus(false));
  };

  const isTrack = (data: Track | Album): data is Track => {
    return (data as Track).audio !== undefined;
  };

  return (
    <>
      <div className="featurepage wrapper">
        <h2 className="text-4xl font-bold tracking-wider">
          Featured {state.entity}
        </h2>

        <div className="flex flex-wrap my-8 w-full">
          {state.featuredData.map((data: Album | Track) => (
            <div key={data.id} className="p-3 hover:bg-grey rounded-xl">
              <div key={data.id} className="w-48">
                <div className="w-48 relative">
                  {isTrack(data) && (
                    <span className="rounded-full p-[6px] bg-orange absolute right-1 bottom-1 flex justify-center items-center">
                      {isSomethingPlaying && currentTrack.id === data.id ? (
                        <IoPause
                          className="cursor-pointer text-3xl"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePause();
                          }}
                        />
                      ) : (
                        <IoPlay
                          className="cursor-pointer text-3xl"
                          onClick={(e: React.MouseEvent<SVGElement>) => {
                            e.stopPropagation();
                            handlePlay(data);
                          }}
                        />
                      )}
                    </span>
                  )}

                  <img src={data.image} className="h-48 w-48 rounded-lg"></img>
                </div>

                {state.basePath && (
                  <Link to={`/${state.basePath}/${data.id}`} state={data}>
                    <p className="text-wrap text-lg mt-2">{data.name}</p>
                    <p className="text-wrap text-sm mt-1">{data.artist_name}</p>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FeaturedPage;
