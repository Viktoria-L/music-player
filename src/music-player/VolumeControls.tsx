import { IoMdVolumeHigh, IoMdVolumeOff, IoMdVolumeLow } from "react-icons/io";
import { useState, useEffect } from "react";
import { AudioProps } from "./MiniAudioPlayer";

export const VolumeControls = ({ audioRef }: AudioProps) => {
  const [volume, setVolume] = useState<number>(60);
  const [muteVolume, setMuteVolume] = useState(false);

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
    <div className=" hidden sm:flex items-center w-40 self-center pr-4">
      <button
        className="m-0"
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
  );
};
