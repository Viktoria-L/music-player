import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { GoInfo, GoHome, GoListUnordered, GoLog } from "react-icons/go";
import { PiMusicNotes } from "react-icons/pi";
import { BiAlbum } from "react-icons/bi";
import { GiHeadphones } from "react-icons/gi";

interface NavbarProps {
  openNav: boolean;
  setOpenNav: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ openNav, setOpenNav }) => {
  //   const [openNav, setOpenNav] = useState(true);
  //   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  //   const threshold = 900;

  //   const handleResize = () => {
  //     setWindowWidth(window.innerWidth);
  //   };

  //   useEffect(() => {
  //     window.addEventListener("resize", handleResize);

  //     return () => {
  //       window.removeEventListener("resize", handleResize);
  //     };
  //   }, []);

  //   useEffect(() => {
  //     if (windowWidth <= threshold) {
  //       setOpenNav(false);
  //     } else {
  //       setOpenNav(true);
  //     }
  //   }, [windowWidth, threshold]);

  return (
    <div
      className={`min-h-screen -mt-20 p-5 pt-8 ${
        openNav ? "w-72" : "w-20"
      } fixed duration-300 bg-black bg-opacity-40 transition-width ease-in-out`}
    >
      {openNav ? (
        <FaAnglesLeft
          onClick={() => {
            setOpenNav((prev) => !prev);
          }}
          className="rounded-full bg-teal text-2xl p-1 absolute -right-3 top-20 cursor-pointer"
        />
      ) : (
        <FaAnglesRight
          onClick={() => {
            setOpenNav((prev) => !prev);
          }}
          className="rounded-full bg-teal text-2xl p-1 absolute -right-3 top-20 cursor-pointer"
        />
      )}
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
  );
};

//TODO, gör en till UL nedanför som kan fyllas på med spellistor. och visa spellistor samt en spellista add new
