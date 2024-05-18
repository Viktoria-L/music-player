//Import icons from react-icons
import {
  IoPlayBack,
  IoPlayForward,
  IoPlaySkipBack,
  IoPlaySkipForward,
  IoPlay,
  IoPause,
} from "react-icons/io5";
import { IoMdVolumeHigh, IoMdVolumeOff, IoMdVolumeLow } from "react-icons/io";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  handleNext,
  handlePrevious,
  togglePlay,
  setTimeProgress,
} from "../../stores/musicStore/musicSlice";
import { AudioProps } from "../MiniAudioPlayer";
import { RootState } from "../../stores/configureStore";

const Controls = ({ audioRef, progressBarRef }: AudioProps) => {
  const dispatch = useDispatch();

  const duration = useSelector((state: RootState) => state.musicStore.duration);
  const isPlaying = useSelector(
    (state: RootState) => state.musicStore.isPlaying
  );

  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);

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

  // const togglePlayPause = () => {
  //   setIsPlaying((prevState) => !prevState);
  // };

  // const playAnimationRef = useRef();
  // const repeat = useCallback(() => {
  //   const currentTime = audioRef.current.currentTime;
  //   dispatch(setTimeProgress(currentTime));
  //   progressBarRef.current.value = currentTime;
  //   progressBarRef.current.style.setProperty(
  //     "--range-progress",
  //     `${(progressBarRef.current.value / duration) * 100}%`
  //   );

  //   playAnimationRef.current = requestAnimationFrame(repeat);
  // }, [audioRef, duration, progressBarRef, setTimeProgress]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  const skipForward = () => {
    if (audioRef.current) audioRef.current.currentTime += 15;
  };
  const skipBackward = () => {
    if (audioRef.current) audioRef.current.currentTime -= 15;
  };

  useEffect(() => {
    if (audioRef && audioRef.current) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
  }, [volume, audioRef, muteVolume]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  return (
    <div className={`controlwrapper flex flex-col justify-center gap-4 w-full`}>
      <div className={`controls text-center`}>
        <button
          onClick={() => {
            dispatch(handlePrevious());
          }}
          className="miniBtn"
        >
          <IoPlaySkipBack />
        </button>
        <button onClick={skipBackward} className="skip">
          <IoPlayBack className="skip" />
        </button>
        <button onClick={togglePlayPause}>
          {isPlaying ? <IoPause /> : <IoPlay />}
        </button>
        <button onClick={skipForward} className="skip">
          <IoPlayForward />
        </button>
        <button
          onClick={() => {
            dispatch(handleNext());
          }}
          className="miniBtn"
        >
          <IoPlaySkipForward />
        </button>
      </div>
      <div className="volume w-40 flex self-center">
        <button
          className="volBtn"
          onClick={() => {
            setMuteVolume((prev) => !prev);
          }}
        >
          {muteVolume || volume < 5 ? (
            <IoMdVolumeOff />
          ) : volume < 40 ? (
            <IoMdVolumeLow />
          ) : (
            <IoMdVolumeHigh />
          )}
        </button>
        <input
          type="range"
          style={{
            background: `linear-gradient(to right, #f50 ${volume}%, #ccc ${volume}%)`,
          }}
          value={volume}
          min={0}
          max={100}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};

export default Controls;
