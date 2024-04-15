import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Header } from "../components/Header";
import MiniAudioPlayer from "../music-player/MiniAudioPlayer";

const Root = () => {
  return (
    <div className="text-white relative min-w-[345px]">
      <Header />
      <div className="flex">
        <Navbar />
        <Outlet />
      </div>
      <MiniAudioPlayer />
    </div>
  );
};

export default Root;
