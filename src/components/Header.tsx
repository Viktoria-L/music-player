import { SearchBar } from "./Searchbar";
import { GiAllSeeingEye } from "react-icons/gi";
import {
  GoBell,
  GoGear,
  GoPerson,
  GoSearch,
  GoChevronDown,
} from "react-icons/go";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../stores/configureStore";

export const Header = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [showSearch, setShowSearch] = useState(true);
  const [collapseMenu, setCollapseMenu] = useState(false);
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  const navigate = useNavigate();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const threshold = 470;

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth <= threshold) {
      setShowSearch(false);
      setCollapseMenu(true);
    } else {
      setShowSearch(true);
      setCollapseMenu(false);
    }
  }, [windowWidth, threshold]);

  const toggleDropdownMenu = () => {
    setShowDropdownMenu(!showDropdownMenu);
  };

  return (
    <header className="w-full h-20 fixed top-0 flex justify-between items-center px-4 z-9">
      <GiAllSeeingEye className="invisible text-5xl z-10" />

      {showSearch ? (
        <SearchBar />
      ) : (
        <GoSearch
          className="text-xl cursor-pointer"
          onClick={() => setShowSearch((prev) => !prev)}
        />
      )}

      {/* Dropdown menu /collapse menu */}
      {collapseMenu ? (
        <span onClick={() => toggleDropdownMenu()} className="cursor-pointer">
          <GoChevronDown className="text-2xl" />
        </span>
      ) : (
        <span className="flex sm:gap-7 gap-3 items-center text-xl pr-4">
          <GoGear />
          <GoBell />
          <GoPerson
            className="cursor-pointer"
            onClick={() => {
              isAuthenticated ? navigate(`/profile`) : navigate(`/login/`);
            }}
          />
        </span>
      )}
      {showDropdownMenu && (
        <div className="absolute right-0 top-12 bg-black bg-opacity-50 p-4 mt-2 shadow-md">
          <div className="flex flex-col gap-3 items-center text-xl">
            <GoGear />
            <GoBell />
            <GoPerson onClick={() => navigate(`/login/`)} />
          </div>
        </div>
      )}
    </header>
  );
};
