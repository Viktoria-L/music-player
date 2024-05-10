import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../stores/configureStore";
import { Track } from "../models/TracksResponse";
import {
  addSongToPlaylist,
  addToFavorites,
  fetchPlaylists,
  fetchFavorites,
} from "../stores/userStore/userThunk";

interface DropDownProps {
  menuRef: React.RefObject<HTMLDivElement>;
  track: Track;
  showDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

const Dropdown: React.FC<DropDownProps> = ({
  menuRef,
  track,
  showDropdown,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [submenuPosition, setSubmenuPosition] = useState<"left" | "right">(
    "right"
  );
  const userPlaylists = useSelector((state: RootState) => state.user.playlists);

  useEffect(() => {
    const updateMenuPosition = () => {
      if (menuRef.current) {
        const menuWidth = menuRef.current.getBoundingClientRect();
        const spaceRight = window.innerWidth - menuWidth.right;
        const spaceLeft = menuWidth.left;
        const requiredSpace = 300;

        const newPosition =
          spaceRight < requiredSpace && spaceLeft >= requiredSpace
            ? "left"
            : "right";
        if (newPosition !== submenuPosition) {
          setSubmenuPosition(newPosition);
        }
      }
    };

    if (showSubmenu) {
      window.addEventListener("resize", updateMenuPosition);
      updateMenuPosition();
    }

    return () => {
      window.removeEventListener("resize", updateMenuPosition);
    };
  }, [showSubmenu]);

  const handleFavorite = () => {
    dispatch(addToFavorites(track));
    dispatch(fetchFavorites());
  };

  return (
    <div className="relative block text-left" ref={menuRef}>
      <div
        className="absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
        onMouseLeave={() => setShowSubmenu(false)}
      >
        <div
          className="py-1"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={handleFavorite}
          >
            Add to favorite
          </div>
          <div
            onMouseEnter={() => setShowSubmenu(true)}
            className={`px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer 
            ${
              submenuPosition === "left"
                ? "origin-top-right left-0"
                : "origin-top-left right-0"
            }`}
          >
            Add to Playlist
            {showSubmenu && (
              <div
                className={`submenu ${
                  submenuPosition === "left" ? "submenu-left" : "submenu-right"
                } absolute top-0 mt-1 w-56 rounded-md shadow-lg bg-white`}
              >
                {userPlaylists.map((playlist, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      dispatch(
                        addSongToPlaylist({
                          playlistId: playlist._id,
                          track,
                        })
                      ),
                        dispatch(fetchPlaylists());
                      setShowSubmenu(false);
                      showDropdown(false);
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {playlist.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <a
            href="#delete"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Delete
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
