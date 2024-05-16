import { BsMusicNoteBeamed } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { handleNext, setDuration } from "../stores/musicStore/musicSlice";
import { RootState } from "../stores/configureStore";
import { AudioProps } from "./MiniAudioPlayer";

const MiniDisplayTrack = ({
  audioRef,
  progressBarRef,
  mini = "",
  tracks,
}: AudioProps) => {
  const dispatch = useDispatch();

  const currentTrack = useSelector(
    (state: RootState) => state.musicStore.currentTrack
  );
  const currentAlbumInfo = useSelector(
    (state: RootState) => state.musicStore.currentAlbum
  );

  const duration = useSelector((state: RootState) => state.musicStore.duration);

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
      <div className={`pl-4 flex gap-4 items-center`}>
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
            <div className="icon-wrapper">
              <span className="audio-icon">
                <BsMusicNoteBeamed className="" />
              </span>
            </div>
          )}
        </div>
        <div
          className={`h-20 flex flex-col justify-center text-orange-500 leading-6 tracking-wider ${mini}`}
        >
          <p className="font-semibold">{currentTrack.name}</p>
          <p className="">{currentTrack.artist_name}</p>
        </div>
      </div>
    </div>
  );
};

export default MiniDisplayTrack;
