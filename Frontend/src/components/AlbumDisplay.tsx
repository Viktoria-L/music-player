import { Link, useLocation } from "react-router-dom";
import { IoPlay, IoPause } from "react-icons/io5";
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
import { nocover } from "../assets/image/images";
import { IoMdInformationCircleOutline } from "react-icons/io";

interface DisplayProps {
  data: Track;
  basePath: string;
  display: string;
}

const AlbumDisplay: React.FC<DisplayProps> = ({ data, basePath, display }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const currentTrack = useSelector(
    (state: RootState) => state.musicStore.currentTrack
  );
  const isSomethingPlaying = useSelector(
    (state: RootState) => state.musicStore.isPlaying
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

  const handlePlay = (data: Track) => {
    dispatch(setCurrentTrack(data));
    dispatch(setPlayStatus(true));
  };

  const handlePause = () => {
    dispatch(setPlayStatus(false));
  };

  const handleFavorite = async () => {
    await dispatch(addToFavorites(data));
    dispatch(fetchFavorites());
  };

  const removeFavorite = async () => {
    await dispatch(removeFromFavorites(id));
    dispatch(fetchFavorites());
  };

  return (
    <div key={id} className="p-3 hover:bg-grey rounded-xl relative group">
      <div className={`${display === "grid" ? "w-full" : "w-48"}`}>
        <div className={`${display === "grid" ? "w-full" : "w-48"} relative`}>
          <a
            href={`${data.shareurl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <IoMdInformationCircleOutline />
          </a>
          {basePath === "track" && (
            <>
              {isAuthenticated &&
                (favorites?.length > 0 ? (
                  favorites.map((favorite) =>
                    favorite.id === id ? (
                      <GoHeartFill
                        key={favorite.id}
                        className="cursor-pointer text-2xl absolute left-2 top-2"
                        onClick={(e: React.MouseEvent<SVGElement>) => {
                          e.stopPropagation();
                          removeFavorite();
                        }}
                      />
                    ) : (
                      <GoHeart
                        key={favorite.id}
                        className="cursor-pointer text-2xl absolute left-2 top-2"
                        onClick={(e: React.MouseEvent<SVGElement>) => {
                          e.stopPropagation();
                          handleFavorite();
                        }}
                      />
                    )
                  )
                ) : (
                  <GoHeart
                    key={id}
                    className="cursor-pointer text-2xl absolute left-2 top-2"
                    onClick={(e: React.MouseEvent<SVGElement>) => {
                      e.stopPropagation();
                      handleFavorite();
                    }}
                  />
                ))}
              {isAuthenticated && (
                <HiDotsVertical
                  className="text-white cursor-pointer absolute text-2xl right-2 top-2"
                  onClick={(e: React.MouseEvent<SVGElement>) => {
                    e.stopPropagation();
                    setShowDropdown((prev) => !prev);
                  }}
                />
              )}
              {showDropdown && (
                <Dropdown
                  menuRef={menuRef}
                  track={data}
                  showDropdown={setShowDropdown}
                />
              )}
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
            </>
          )}
          <img
            src={image ? image : nocover}
            className={`${display === "grid" ? "w-full" : "w-48"} rounded-xl`}
          ></img>
        </div>

        {basePath && (
          <Link key={id} to={`/${basePath}/${id}`} state={data}>
            <p className="text-wrap mt-2">{name}</p>
            {location.pathname === "/featured" && (
              <p className="text-wrap mt-2">{artist_name}</p>
            )}
          </Link>
        )}
      </div>
    </div>
  );
};

export default AlbumDisplay;
