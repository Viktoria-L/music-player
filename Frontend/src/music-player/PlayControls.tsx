import {
  IoPlayBack,
  IoPlayForward,
  IoPlaySkipBack,
  IoPlaySkipForward,
  IoPlay,
  IoPause,
} from "react-icons/io5";

import { useState, useEffect, useRef, useCallback, RefObject } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  handleNext,
  handlePrevious,
  setDuration,
  setTimeProgress,
  togglePlay,
} from "../stores/musicStore/musicSlice";
import { RootState } from "../stores/configureStore";

interface PlayControlsProps {
  audioRef: RefObject<HTMLAudioElement>;
  progressBarRef: RefObject<HTMLInputElement>;
  mini?: string;
}

export const PlayControls = ({
  audioRef,
  progressBarRef,
  mini = "",
}: PlayControlsProps) => {
  const dispatch = useDispatch();
  // const trackIndex = useSelector((state) => state.musicInStore.trackIndex);
  // const currentTrack = useSelector((state) => state.musicInStore.currentTrack);
  // const timeProgress = useSelector((state) => state.musicInStore.timeProgress);
  const duration = useSelector(
    (state: RootState) => state.musicInStore.duration
  );
  const isPlaying = useSelector(
    (state: RootState) => state.musicInStore.isPlaying
  );

  const togglePlayPause = () => {
    dispatch(togglePlay());
    // setIsPlaying((prevState) => !prevState);
  };

  const playAnimationRef = useRef<number | null>(null);
  const repeat = useCallback(() => {
    if (audioRef.current && progressBarRef.current) {
      const currentTime = audioRef.current.currentTime;
      dispatch(setTimeProgress(currentTime));
      progressBarRef.current.value = currentTime;
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
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  return (
    <div className={`controls flex text-center ${mini}`}>
      <button
        onClick={() => {
          dispatch(handlePrevious());
        }}
      >
        <IoPlaySkipBack className="text-sm" />
      </button>
      {/* <button onClick={skipBackward} className='skip'>
        <IoPlayBack className='skip' />
    </button> */}
      <button onClick={togglePlayPause}>
        {isPlaying ? (
          <IoPause className="text-sm" />
        ) : (
          <IoPlay className="text-sm" />
        )}
      </button>
      {/* <button onClick={skipForward} className='skip'>
        <IoPlayForward />
    </button> */}
      <button
        onClick={() => {
          dispatch(handleNext());
        }}
      >
        <IoPlaySkipForward className="text-sm" />
      </button>
    </div>
  );
};
