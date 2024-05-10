import { Link, useLocation } from "react-router-dom";
import { IoPlay } from "react-icons/io5";
import { Track } from "../models/TracksResponse";
import { GoHeart, GoHeartFill } from "react-icons/go";
import {
  addToFavorites,
  fetchFavorites,
  removeFromFavorites,
} from "../stores/userStore/userThunk";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../stores/configureStore";
import { HiDotsVertical } from "react-icons/hi";
import Dropdown from "./Dropdown";
import {
  setCurrentTrack,
  setPlayStatus,
} from "../stores/musicStore/musicSlice";

interface DisplayProps {
  data: Track;
  basePath: string;
}

const AlbumDisplay: React.FC<DisplayProps> = ({ data, basePath }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const favorites = useSelector((state: RootState) => state.user.favorites);
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const { id, image, name, artist_name } = data;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  //TODO , borde jag lyfta ut dessa funktioner och exportera/ importera dem där de behövs?

  const handlePlay = (data: Track) => {
    dispatch(setCurrentTrack(data));
    dispatch(setPlayStatus(true));
  };

  const handleFavorite = () => {
    dispatch(addToFavorites(data));
    dispatch(fetchFavorites());
  };

  const removeFavorite = () => {
    dispatch(removeFromFavorites(id));
    dispatch(fetchFavorites());
  };

  return (
    <div key={id} className="w-48">
      <div className="w-48 relative">
        {basePath === "track" && (
          <>
            {isAuthenticated &&
              (favorites?.length > 0 ? (
                favorites.map((favorite) =>
                  favorite.id === id ? (
                    <GoHeartFill
                      className="cursor-pointer text-2xl absolute left-2 top-2"
                      onClick={removeFavorite}
                    />
                  ) : (
                    <GoHeart
                      className="cursor-pointer text-2xl absolute left-2 top-2"
                      onClick={handleFavorite}
                    />
                  )
                )
              ) : (
                <GoHeart
                  className="cursor-pointer text-2xl absolute left-2 top-2"
                  onClick={handleFavorite}
                />
              ))}
            {isAuthenticated && (
              <HiDotsVertical
                className="text-white cursor-pointer absolute text-2xl right-2 top-2"
                onClick={() => setShowDropdown((prev) => !prev)}
              />
            )}
            {showDropdown && (
              <Dropdown
                menuRef={menuRef}
                track={data}
                showDropdown={setShowDropdown}
              />
            )}
            <IoPlay
              className="cursor-pointer text-5xl absolute right-1 bottom-1"
              onClick={() => handlePlay(data)}
            />
          </>
        )}
        <img src={image} className="h-48 w-48 rounded-xl"></img>
      </div>

      {basePath && (
        <Link to={`/${basePath}/${id}`} state={data}>
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
