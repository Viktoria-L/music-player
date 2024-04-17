import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Header } from "../components/Header";
import MiniAudioPlayer from "../music-player/MiniAudioPlayer";
import { useState, useEffect } from "react";

const Root = () => {
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
    <div className="text-white flex flex-col h-screen min-w-[345px]">
      <Header />
      <div className="h-full flex overflow-hidden flex-grow mt-20">
        <Navbar openNav={openNav} setOpenNav={setOpenNav} />
        <div
          className={`duration-300 transition-width ease-in-out flex overflow-hidden flex-grow ${
            openNav ? "ml-72" : "ml-20"
          }`}
        >
          <Outlet />
        </div>
      </div>
      <MiniAudioPlayer />
    </div>
  );
};

export default Root;

{
  /* <div className="text-white relative min-w-[345px]">
      <Header />
      <div className="flex h-[calc(100vh-80px)]">
        <Navbar />
        <Outlet />
      </div>
      <MiniAudioPlayer />
    </div> */
}
