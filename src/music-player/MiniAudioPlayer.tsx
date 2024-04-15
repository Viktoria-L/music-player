// import DisplayTrack from "./DisplayTrack";
//import Controls from "./Controls";
import ProgressBar from "./ProgressBar";
import { useRef } from "react";
//import { tracks } from '../../assets/music/tracks';
//import { useSelector } from "react-redux";
import { PlayControls } from "./PlayControls";
import { VolumeControls } from "./VolumeControls";
import MiniDisplayTrack from "./MiniDisplayTrack";
import { useSelector } from "react-redux";
import { RootState } from "../configureStore/configureStore";

//Parent,root component
const MiniAudioPlayer = () => {
  const tracks = useSelector((state: RootState) => state.musicInStore.tracks);

  const audioRef = useRef();
  const progressBarRef = useRef();

  return (
    <div className="mini-audio-player fixed bottom-0 h-20 w-full">
      <div className="inner flex md:gap-40">
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
