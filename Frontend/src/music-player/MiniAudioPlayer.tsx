import ProgressBar from "./ProgressBar";
import { useRef, RefObject, useState } from "react";
import { PlayControls } from "./PlayControls";
import { VolumeControls } from "./VolumeControls";
import MiniTrackDisplay from "./MiniDisplay";
import { useSelector } from "react-redux";
import { RootState } from "../stores/configureStore";
import { FaChevronDown } from "react-icons/fa6";
import AudioPlayer from "./maximizedPlayer/AudioPlayer";

export interface AudioProps {
  audioRef: RefObject<HTMLAudioElement>;
  progressBarRef: RefObject<HTMLInputElement>;
}

const MiniAudioPlayer = () => {
  const [fullView, setFullView] = useState(false);

  const tracks = useSelector((state: RootState) => state.musicStore.tracks);
  const currentTrack = useSelector(
    (state: RootState) => state.musicStore.currentTrack
  );

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);

  const toggleView = () => {
    setFullView((prev) => !prev);
  };

  return (
    <div
      className={`${
        fullView ? "fixed" : "fixed bottom-0"
      } mini-audio-player h-20 w-full z-50`}
    >
      <div className="inner absolute w-full h-20 flex justify-center">
        <MiniTrackDisplay {...{ audioRef, progressBarRef, tracks }} />
        <div
          className={`${
            currentTrack ? "flex" : "hidden"
          } h-20 items-start justify-start`}
        >
          {/* {fullView ? (
            <FaChevronDown
              className="relative cursor-pointer top-2 -right-2 rounded-full p-1 text-2xl hover:bg-orange"
              onClick={toggleView}
            />
          ) : (
            <FaChevronUp
              className="relative cursor-pointer top-2 -right-2 rounded-full p-1 text-2xl hover:bg-orange"
              onClick={toggleView}
            />
          )} */}
        </div>
        <div className="flex flex-col w-full items-end sm:items-center justify-evenly">
          <PlayControls {...{ audioRef, progressBarRef, tracks }} />
          <ProgressBar {...{ audioRef, progressBarRef, tracks }} />
        </div>
        <VolumeControls {...{ audioRef, progressBarRef }} />
      </div>

      {fullView && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 z-50 flex justify-center items-center">
          <div className="relative w-full h-full bg-gray-900 p-4 overflow-auto">
            <FaChevronDown
              className="absolute top-4 right-4 cursor-pointer rounded-full p-1 text-2xl text-white hover:bg-orange-500"
              onClick={toggleView}
            />
            <AudioPlayer />
          </div>
        </div>
      )}
    </div>
  );
};

export default MiniAudioPlayer;
