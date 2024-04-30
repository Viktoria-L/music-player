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
  setDuration,
  setTimeProgress,
} from "../../stores/musicStore/musicSlice";

//Renders audio controls and volume slider
const Controls = ({ audioRef, progressBarRef, tracks }) => {
  const dispatch = useDispatch();
  // const trackIndex = useSelector((state) => state.musicInStore.trackIndex);
  // const currentTrack = useSelector((state) => state.musicInStore.currentTrack);
  // const timeProgress = useSelector((state) => state.musicInStore.timeProgress);
  const duration = useSelector((state) => state.musicInStore.duration);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying((prevState) => !prevState);
  };

  const playAnimationRef = useRef();
  const repeat = useCallback(() => {
    const currentTime = audioRef.current.currentTime;
    dispatch(setTimeProgress(currentTime));
    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
      "--range-progress",
      `${(progressBarRef.current.value / duration) * 100}%`
    );

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  //Jump forward/backward 15 sec
  const skipForward = () => {
    audioRef.current.currentTime += 15;
  };
  const skipBackward = () => {
    audioRef.current.currentTime -= 15;
  };

  //Set and jump to next/prev track
  // const handlePrevious = () => {
  //     if (trackIndex === 0) {
  //         let lastTrackIndex = tracks.length - 1;
  //         setTrackIndex(lastTrackIndex);
  //         setCurrentTrack(tracks[lastTrackIndex]);
  //       } else {
  //         setTrackIndex((prev) => prev - 1);
  //         setCurrentTrack(tracks[trackIndex - 1]);
  //       }
  //     };

  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
  }, [volume, audioRef, muteVolume]);

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
          onChange={(e) => {
            setVolume(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Controls;

// Controls.propTypes = {
//     audioRef: PropTypes.object.isRequired,
//     progressBarRef: PropTypes.object.isRequired,
//     tracks: PropTypes.object.isRequired,
//     mini: PropTypes.string
// }
