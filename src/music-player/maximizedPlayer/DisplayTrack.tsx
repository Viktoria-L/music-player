import { BsMusicNoteBeamed } from 'react-icons/bs';
import { useSelector, useDispatch } from "react-redux";
import { handleNext, setDuration } from '../../configureStore/musicSlice';

//Renders audio content
const DisplayTrack = ({ audioRef, progressBarRef, mini="" , tracks}) => {
    const dispatch = useDispatch();

    //TODO musikData måste in i storen på något sätt för där sätts currentTrack
    const currentTrack = useSelector((state) => state.musicInStore.currentTrack);
    const duration = useSelector((state) => state.musicInStore.duration);

    //console.log(musicData.results[1].tracks[0].audio)

    const onLoadedMetadata = () => {
        const seconds = audioRef.current.duration;
       // setDuration(seconds);
        dispatch(setDuration(seconds));
        progressBarRef.current.max = seconds;
    }
//Den övre utkommenterade är hur det såg ut först
// Datan i responsen ser olika ut beroende på om man hämtar tracks eller album eller artist.. hur ska man lösa det?

    return (
        <div className="display-container w-full">
            <audio src={currentTrack.audio} ref={audioRef} onLoadedMetadata={onLoadedMetadata} onEnded={()=>{dispatch(handleNext())}} />
            {/* <audio src={musicData.results[1]?.audio} ref={audioRef} onLoadedMetadata={onLoadedMetadata} onEnded={()=>{dispatch(handleNext())}} /> */}

            <div className={`flex gap-4 flex-col ${mini}`}>
                <div className='audio-image'>
                    {currentTrack.image ? (
                    <div className='image-crop'><img src={currentTrack.image} alt='nånting' /></div>) : 
                    (<div className="icon-wrapper">
                     <span className="audio-icon">
                        <BsMusicNoteBeamed />
                     </span>
                    </div>)}
                </div>
                <div className={`text-orange-500 font-bold leading-6 tracking-wider text-center ${mini}`}>
                    <p className='title font-bold'>{currentTrack.name}</p>
                    <p>{currentTrack.artist_name}</p>
                </div>
            </div>
        </div>
    )
}

export default DisplayTrack;

// DisplayTrack.propTypes = {
//     audioRef: PropTypes.object.isRequired,
//     progressBarRef: PropTypes.object.isRequired,
//     mini: PropTypes.string,
//     musicData:  PropTypes.object,
// }