import { useLocation, Link } from "react-router-dom";
import { IoPlay } from "react-icons/io5";
import { Album } from "../models/AlbumResponse";
import { Track } from "../models/TracksResponse";
import { useDispatch } from "react-redux";
import {
  setCurrentTrack,
  setPlayStatus,
} from "../stores/musicStore/musicSlice";

const FeaturedPage = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();

  const handlePlay = (data: Track) => {
    dispatch(setCurrentTrack(data));
    dispatch(setPlayStatus(true));
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

        <div className="flex flex-wrap my-8 gap-10 w-full">
          {state.featuredData.map((data: Album | Track) => (
            <div key={data.id} className="w-48">
              <div className="w-48 relative">
                {isTrack(data) && (
                  <span className="rounded-full p-2 bg-orange absolute right-1 bottom-1 flex justify-center items-center">
                    <IoPlay
                      className="cursor-pointer text-3xl"
                      onClick={(e: React.MouseEvent<SVGElement>) => {
                        e.stopPropagation();
                        handlePlay(data);
                      }}
                    />
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
          ))}
        </div>
      </div>
    </>
  );
};

export default FeaturedPage;
