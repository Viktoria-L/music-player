import { Link, useLocation, useResolvedPath } from "react-router-dom";
import { IoPlay } from "react-icons/io5";
import { Album } from "../models/AlbumResponse";
import { Track } from "../models/TracksResponse";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useAuth } from "../authStore/AuthStore";
import { addToFavorites } from "../utils/helperFunctions";

interface DisplayProps {
  data: Album | Track;
  basePath: string;
}

const AlbumDisplay: React.FC<DisplayProps> = ({ data, basePath }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const { id, image, name, artist_name } = data;

  return (
    <div key={id} className="w-48">
      <div className="w-48 relative">
        {basePath === "track" && (
          <GoHeart
            className="cursor-pointer text-2xl absolute left-2 top-2"
            onClick={() => addToFavorites(data)}
          />
        )}
        <IoPlay className="cursor-pointer text-5xl absolute right-1 bottom-1" />
        <img src={image} className="h-48 w-48 rounded-xl"></img>
      </div>

      {basePath && (
        <Link to={`${basePath}/${id}`} state={data}>
          <p className="text-wrap mt-2">{name}</p>
          {location.pathname === "/featured" && (
            <p className="text-wrap mt-2">{artist_name}</p>
          )}
        </Link>
      )}
    </div>
  );
};

export default AlbumDisplay;
