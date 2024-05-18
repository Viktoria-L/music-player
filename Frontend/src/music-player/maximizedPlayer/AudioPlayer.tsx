import Controls from "./Controls";
import ProgressBar from "../ProgressBar";
import { useRef } from "react";
import { MaxDisplay } from "./MaxDisplay";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/configureStore";

const AudioPlayer = () => {
  const tracks = useSelector((state: RootState) => state.musicStore.tracks);

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full h-screen bg-grey z-50">
      <div className="inner m-auto flex flex-col justify-center h-screen items-center gap-4 max-w-7xl">
        <MaxDisplay {...{ audioRef, progressBarRef }} />
        <Controls {...{ audioRef, progressBarRef }} />
        <ProgressBar {...{ progressBarRef, audioRef }} />
      </div>
    </div>
  );
};

export default AudioPlayer;
