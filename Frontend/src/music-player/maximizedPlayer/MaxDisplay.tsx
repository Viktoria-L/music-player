import { BsMusicNoteBeamed } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { handleNext, setDuration } from "../../stores/musicStore/musicSlice";
import { AppDispatch, RootState } from "../../stores/configureStore";
import { AudioProps } from "../MiniAudioPlayer";

export const MaxDisplay = ({ audioRef, progressBarRef }: AudioProps) => {
  const dispatch: AppDispatch = useDispatch();
  const currentTrack = useSelector(
    (state: RootState) => state.musicStore.currentTrack
  );

  const onLoadedMetadata = () => {
    const seconds = audioRef.current?.duration;
    dispatch(setDuration(seconds));
    if (progressBarRef.current && seconds) {
      progressBarRef.current.max = seconds.toString();
    }
  };

  return (
    <div className="display-container w-full">
      <audio
        src={currentTrack.audio}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={() => {
          dispatch(handleNext());
        }}
      />

      <div className={`flex gap-4 flex-col`}>
        <div className="self-center">
          {currentTrack.image ? (
            <div className="">
              <img src={currentTrack.image} alt="album image" />
            </div>
          ) : (
            <div className="icon-wrapper">
              <span className="audio-icon">
                <BsMusicNoteBeamed />
              </span>
            </div>
          )}
        </div>
        <div
          className={`text-orange-500 font-bold leading-6 tracking-wider text-center`}
        >
          <p className="title font-bold">{currentTrack.name}</p>
          <p>{currentTrack.artist_name}</p>
        </div>
      </div>
    </div>
  );
};
