import ProgressBar from "./ProgressBar";
import { useRef } from "react";
import { PlayControls } from "./PlayControls";
import { VolumeControls } from "./VolumeControls";
import MiniDisplayTrack from "./MiniDisplayTrack";
import { useSelector } from "react-redux";
import { RootState } from "../stores/configureStore";

//Parent,root component
const MiniAudioPlayer = () => {
  const tracks = useSelector((state: RootState) => state.musicInStore.tracks);

  const audioRef = useRef<HTMLAudioElement>();
  const progressBarRef = useRef<HTMLInputElement>();

  return (
    <div className="mini-audio-player fixed bottom-0 h-20 w-full">
      <div className="inner flex md:gap-20">
        <MiniDisplayTrack
          {...{ audioRef, progressBarRef, tracks }}
          mini="mini"
        />
        <div className="flex flex-col w-full items-center justify-center">
          <PlayControls {...{ audioRef, progressBarRef, tracks }} />
          <ProgressBar {...{ progressBarRef, audioRef, tracks }} />
        </div>
        <VolumeControls {...{ audioRef }} />
      </div>
    </div>
  );
};

export default MiniAudioPlayer;
