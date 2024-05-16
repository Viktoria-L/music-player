import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Header } from "../components/Header";
import MiniAudioPlayer from "../music-player/MiniAudioPlayer";
import { useState, useEffect } from "react";
import { NavigationArrow } from "../components/NavigationArrow";

const Root = () => {
  const location = useLocation();
  const [openNav, setOpenNav] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const threshold = 900;

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
      setOpenNav(false);
    } else {
      setOpenNav(true);
    }
  }, [windowWidth, threshold]);

  return (
    <div className="text-white flex flex-col h-[calc(100vh-80px)] min-w-[345px]">
      <Header />
      <div className="h-full flex overflow-hidden flex-grow mt-20">
        <Navbar openNav={openNav} setOpenNav={setOpenNav} />
        <div
          className={`duration-300 transition-width ease-in-out flex flex-col overflow-auto flex-grow ${
            openNav ? "ml-72" : "ml-20"
          }`}
        >
          {location.pathname !== "/" && <NavigationArrow />}
          <Outlet />
        </div>
      </div>
      <MiniAudioPlayer />
    </div>
  );
};

export default Root;
