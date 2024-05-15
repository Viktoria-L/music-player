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
    <div className="display-container">
      <audio
        src={currentTrack.audio}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={() => {
          dispatch(handleNext());
        }}
      />
      <div className={`flex gap-4 flex-col ${mini}`}>
        <div className="audio-image">
          {currentTrack.image || currentAlbumInfo?.image ? (
            <div className="image-crop">
              <img
                className="audio-icon"
                src={
                  currentTrack.image
                    ? currentTrack.image
                    : currentAlbumInfo?.image
                }
                alt="nånting"
              />
            </div>
          ) : (
            <div className="icon-wrapper">
              <span className="audio-icon">
                <BsMusicNoteBeamed className="" />
              </span>
            </div>
          )}
        </div>
        <div
          className={`text-orange-500 font-bold leading-6 tracking-wider text-center ${mini}`}
        >
          <p className="title font-bold">{currentTrack.name}</p>
          <p>{currentTrack.artist_name}</p>
        </div>
      </div>
    </div>
  );
};

export default MiniDisplayTrack;
