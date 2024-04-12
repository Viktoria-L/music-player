import { BsMusicNoteBeamed } from 'react-icons/bs';
import { useSelector, useDispatch } from "react-redux";
import { handleNext, setDuration } from '../configureStore/musicSlice';


//Renders audio content
const MiniDisplayTrack = ({ audioRef, progressBarRef, mini="" }) => {
    const dispatch = useDispatch();

    const currentTrack = useSelector((state) => state.musicInStore.currentTrack);
    const duration = useSelector((state) => state.musicInStore.duration);


    const onLoadedMetadata = () => {
        const seconds = audioRef.current.duration;
       // setDuration(seconds);
        dispatch(setDuration(seconds));
        progressBarRef.current.max = seconds;
    }

    return (
        <div className="display-container">
            <audio src={currentTrack.audio} ref={audioRef} onLoadedMetadata={onLoadedMetadata} onEnded={()=>{dispatch(handleNext())}} />
            <div className={`flex gap-4 flex-col ${mini}`}>
                <div className='audio-image'>
                    {currentTrack.thumbnail ? (
                    <div className='image-crop'><img src={currentTrack.thumbnail} alt='nånting' /></div>) : 
                    (<div className="icon-wrapper">
                     <span className="audio-icon">
                        <BsMusicNoteBeamed />
                     </span>
                    </div>)}
                </div>
                <div className={`text-orange-500 font-bold leading-6 tracking-wider text-center ${mini}`}>
                    <p className='title font-bold'>{currentTrack.title}</p>
                    <p>{currentTrack.author}</p>
                </div>
            </div>
        </div>
    )
}

export default MiniDisplayTrack;

// MiniDisplayTrack.propTypes = {
//     audioRef: PropTypes.object.isRequired,
//     progressBarRef: PropTypes.object.isRequired,
//     mini: PropTypes.string 
// }