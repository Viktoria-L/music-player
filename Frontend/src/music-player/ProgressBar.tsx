import { useSelector } from "react-redux";
import { RootState } from "../stores/configureStore";
import { AudioProps } from "./MiniAudioPlayer";

const ProgressBar = ({ progressBarRef, audioRef }: AudioProps) => {
  const timeProgress = useSelector(
    (state: RootState) => state.musicInStore.timeProgress
  );
  const duration = useSelector(
    (state: RootState) => state.musicInStore.duration
  );

  const handleProgressChange = () => {
    //    audioRef.current.currentTime = progressBarRef.current?.value;
    if (progressBarRef.current) {
      const value = Number(progressBarRef.current.value);
      if (audioRef.current) {
        audioRef.current.currentTime = value;
      }
    }
  };

  const formatTime = (time: number) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };

  return (
    <div className="progress">
      <span className="time current">{formatTime(timeProgress)}</span>
      <input
        type="range"
        ref={progressBarRef}
        defaultValue="0"
        onChange={handleProgressChange}
      />
      <span className="time">{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressBar;
