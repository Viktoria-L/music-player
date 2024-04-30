import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Header } from "../components/Header";
import MiniAudioPlayer from "../music-player/MiniAudioPlayer";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../stores/configureStore";
import { fetchPlaylists } from "../stores/userStore/userThunk";

const Root = () => {
  const dispatch: AppDispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  ); // Antag att din autentiseringsstatus lagras här

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
          className={`duration-300 transition-width ease-in-out flex overflow-auto flex-grow ${
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
