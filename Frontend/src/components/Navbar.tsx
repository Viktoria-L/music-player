import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { GoInfo, GoHome, GoListUnordered } from "react-icons/go";
import { PiMusicNotes } from "react-icons/pi";
import { BiAlbum } from "react-icons/bi";
import { GiHeadphones } from "react-icons/gi";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../stores/configureStore";
import { logout } from "../stores/authStore/authSlice";
import { fetchPlaylists, createPlaylist } from "../stores/userStore/userThunk";
import { useEffect, useState } from "react";
import { BiLogOut, BiLogIn } from "react-icons/bi";
import { GiAllSeeingEye } from "react-icons/gi";

interface NavbarProps {
  openNav: boolean;
  setOpenNav: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ openNav, setOpenNav }) => {
  const navigate = useNavigate();
  const [showCreateInput, setShowCreateInput] = useState(false);
  const [playlistName, setPlaylistName] = useState<string>("");
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const userPlaylists = useSelector((state: RootState) => state.user.playlists);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchPlaylists());
    }
  }, [isAuthenticated]);

  const handleCreate = async () => {
    await dispatch(createPlaylist(playlistName));
    setShowCreateInput(false);
    setPlaylistName("");
    dispatch(fetchPlaylists());
  };

  return (
    <div
      className={`flex flex-col justify-between min-h-screen -mt-20 p-5 pt-8 ${
        openNav ? "w-72" : "w-16"
      } fixed duration-300 bg-black bg-opacity-40 transition-width ease-in-out`}
    >
      {openNav ? (
        <FaAnglesLeft
          onClick={() => {
            setOpenNav((prev) => !prev);
          }}
          className="rounded-full bg-orange text-2xl p-1 absolute -right-3 top-20 cursor-pointer"
        />
      ) : (
        <FaAnglesRight
          onClick={() => {
            setOpenNav((prev) => !prev);
          }}
          className="rounded-full bg-orange text-2xl p-1 absolute -right-3 top-20 cursor-pointer"
        />
      )}
      <div>
        <GiAllSeeingEye className={`${openNav ? "text-5xl" : "text-3xl"}`} />

        <ul className="mt-24 flex flex-col gap-6">
          <li>
            <NavLink to="/" className="">
              {openNav ? (
                <div className="flex gap-2 items-center">
                  <GoHome className="text-xl" /> Home
                </div>
              ) : (
                <GoHome className="text-2xl" />
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/artists" className="">
              {openNav ? (
                <div className="flex gap-2 items-center">
                  <PiMusicNotes className="text-xl" /> Artists
                </div>
              ) : (
                <PiMusicNotes className="text-2xl" />
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/albums" className="">
              {openNav ? (
                <div className="flex gap-2 items-center">
                  <BiAlbum className="text-xl" /> Albums
                </div>
              ) : (
                <BiAlbum className="text-2xl" />
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/songs" className="">
              {openNav ? (
                <div className="flex gap-2 items-center">
                  <GiHeadphones className="text-xl" /> Songs
                </div>
              ) : (
                <GiHeadphones className="text-2xl" />
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/playlists" className="">
              {openNav ? (
                <div className="flex gap-2 items-center">
                  <GoListUnordered className="text-xl" /> Playlists
                </div>
              ) : (
                <GoListUnordered className="text-2xl" />
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className="">
              {openNav ? (
                <div className="flex gap-2 items-center">
                  <GoInfo className="text-xl" /> About
                </div>
              ) : (
                <GoInfo className="text-2xl" />
              )}
            </NavLink>
          </li>
        </ul>
      </div>

      {isAuthenticated ? (
        <>
          {userPlaylists && (
            <div className={`${openNav ? "block" : "hidden"}`}>
              <span>YOUR PLAYLISTS</span>
              <ul className="flex flex-col gap-1">
                {userPlaylists.map((playlist) => (
                  <li key={playlist._id}>
                    <Link
                      to={`/playlist/${playlist._id}`}
                      state={{ data: playlist, type: "Private" }}
                    >
                      {playlist.name}
                    </Link>
                  </li>
                ))}
                <li
                  className="text-orange"
                  onClick={() => setShowCreateInput((prev) => !prev)}
                >
                  Create new playlist +
                </li>
                <>
                  <input
                    className={`${
                      showCreateInput ? "visible" : "invisible"
                    } bg-grey rounded-md`}
                    type="text"
                    value={playlistName}
                    onChange={(e) => setPlaylistName(e.target.value)}
                    placeholder=" Choose playlist name"
                  />
                  <button
                    className={`${
                      showCreateInput ? "visible" : "invisible"
                    } bg-orange rounded-full`}
                    onClick={handleCreate}
                  >
                    Create
                  </button>
                </>
              </ul>
            </div>
          )}
        </>
      ) : (
        <p className={`${openNav ? "block" : "hidden"}`}>
          Please log in to view playlists.
        </p>
      )}

      {/* <p>{isAuthenticated ? "Logged in" : "Not logged in"}</p> */}
      {isAuthenticated ? (
        <button
          className={`${
            openNav ? "w-24 self-center" : "w-0 bg-transparent"
          } bg-orange hover:opacity-70 mb-24 rounded-full`}
          onClick={() => dispatch(logout())}
        >
          {openNav ? "Log out" : <BiLogOut className="text-2xl" />}
        </button>
      ) : (
        <button
          className={`${
            openNav ? "w-24 self-center" : "w-0 bg-transparent"
          } bg-orange hover:opacity-70 mb-24  rounded-full`}
          onClick={() => navigate("/login")}
        >
          {openNav ? "Log in" : <BiLogIn className="text-2xl" />}
        </button>
      )}
    </div>
  );
};
