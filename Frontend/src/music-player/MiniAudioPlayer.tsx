import ProgressBar from "./ProgressBar";
import { useRef, RefObject } from "react";
import { PlayControls } from "./PlayControls";
import { VolumeControls } from "./VolumeControls";
import MiniDisplayTrack from "./MiniDisplayTrack";
import { useSelector } from "react-redux";
import { RootState } from "../stores/configureStore";
import { Track } from "../models/TracksResponse";

//TODO, bort med alla "Mini"
export interface AudioProps {
  audioRef: RefObject<HTMLAudioElement>;
  progressBarRef: RefObject<HTMLInputElement>;
  // mini?: string;
  tracks?: Track[];
}

//Parent,root component
const MiniAudioPlayer = () => {
  const tracks = useSelector((state: RootState) => state.musicStore.tracks);

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);

  return (
    <div className="mini-audio-player fixed bottom-0 h-20 w-full">
      <div className="inner h-20 flex justify-center md:gap-20">
        <MiniDisplayTrack {...{ audioRef, progressBarRef, tracks }} />
        <div className="flex flex-col w-full items-center justify-evenly">
          <PlayControls {...{ audioRef, progressBarRef, tracks }} />
          <ProgressBar {...{ progressBarRef, audioRef, tracks }} />
        </div>
        <VolumeControls {...{ audioRef }} />
      </div>
    </div>
  );
};

export default MiniAudioPlayer;
