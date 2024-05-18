import {
  IoPlaySkipBack,
  IoPlaySkipForward,
  IoPlay,
  IoPause,
  IoShuffle,
  IoRepeat,
} from "react-icons/io5";

import { useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  handleNext,
  handlePrevious,
  setTimeProgress,
  togglePlay,
} from "../stores/musicStore/musicSlice";
import { RootState } from "../stores/configureStore";
import { AudioProps } from "./MiniAudioPlayer";

export const PlayControls = ({ audioRef, progressBarRef }: AudioProps) => {
  const dispatch = useDispatch();

  const duration = useSelector((state: RootState) => state.musicStore.duration);
  const isPlaying = useSelector(
    (state: RootState) => state.musicStore.isPlaying
  );

  const togglePlayPause = () => {
    dispatch(togglePlay());
  };

  const playAnimationRef = useRef<number | null>(null);
  const repeat = useCallback(() => {
    if (audioRef.current && progressBarRef.current) {
      const currentTime = audioRef.current.currentTime;
      dispatch(setTimeProgress(currentTime));
      progressBarRef.current.value = currentTime.toString();
      const progressPercentage = (currentTime / duration) * 100;
      progressBarRef.current.style.setProperty(
        "--range-progress",
        `${progressPercentage}%`
      );
      // progressBarRef.current.style.setProperty(
      //   "--range-progress",
      //   `${(progressBarRef.current.value / duration) * 100}%`
      // );

      playAnimationRef.current = requestAnimationFrame(repeat);
    }
  }, [audioRef, duration, progressBarRef, setTimeProgress, dispatch]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  return (
    <div className={`controls flex text-center gap-2`}>
      <button className="hidden sm:block">
        <IoShuffle className="text-xl hover:text-orange" />
      </button>
      <button
        className="hidden sm:block"
        onClick={() => {
          dispatch(handlePrevious());
        }}
      >
        <IoPlaySkipBack className="text-2xl hover:text-orange" />
      </button>
      {/* <button onClick={skipBackward} className='skip'>
        <IoPlayBack className='skip' />
    </button> */}
      <button onClick={togglePlayPause} className="pr-3 sm:pr-0">
        {isPlaying ? (
          <IoPause className="text-4xl hover:text-orange" />
        ) : (
          <IoPlay className="text-4xl hover:text-orange" />
        )}
      </button>
      {/* <button onClick={skipForward} className='skip'>
        <IoPlayForward />
    </button> */}
      <button
        className="hidden sm:block"
        onClick={() => {
          dispatch(handleNext());
        }}
      >
        <IoPlaySkipForward className="text-2xl hover:text-orange" />
      </button>
      <button className="hidden sm:block">
        <IoRepeat className="text-xl hover:text-orange" />
      </button>
    </div>
  );
};
