import { BsMusicNoteBeamed } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { handleNext, setDuration } from "../stores/musicStore/musicSlice";
import { RootState } from "../stores/configureStore";
import { AudioProps } from "./MiniAudioPlayer";

const MiniDisplayTrack = ({ audioRef, progressBarRef }: AudioProps) => {
  const dispatch = useDispatch();

  const currentTrack = useSelector(
    (state: RootState) => state.musicStore.currentTrack
  );
  const currentAlbumInfo = useSelector(
    (state: RootState) => state.musicStore.currentAlbum
  );

  const onLoadedMetadata = () => {
    const seconds = audioRef.current?.duration;
    dispatch(setDuration(seconds));
    if (progressBarRef.current && seconds) {
      progressBarRef.current.max = seconds.toString();
    }
  };

  return (
    <div className="">
      <audio
        src={currentTrack.audio}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={() => {
          dispatch(handleNext());
        }}
      />
      <div className={`pl-4 sm:w-60 flex gap-4 items-center`}>
        <div className="h-14 w-14">
          {currentTrack.image || currentAlbumInfo?.image ? (
            <img
              className=""
              src={
                currentTrack.image
                  ? currentTrack.image
                  : currentAlbumInfo?.image
              }
              alt="track image"
            />
          ) : (
            <span className="audio-icon text-4xl flex h-14 w-14 justify-center items-center rounded-md bg-orange">
              <BsMusicNoteBeamed className="" />
            </span>
          )}
        </div>
        <div className="h-20 flex flex-col justify-center text-orange-500 tracking-wider">
          <p className="font-semibold text-[12px] sm:text-sm">
            {currentTrack.name.length > 25
              ? `${currentTrack.name.slice(0, 25)}...`
              : currentTrack.name}
          </p>
          <p className="text-[10px] sm:text-[12px]">
            {currentTrack.artist_name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MiniDisplayTrack;
