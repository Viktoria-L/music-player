import {
    IoMdVolumeHigh,
    IoMdVolumeOff,
    IoMdVolumeLow,
  } from 'react-icons/io';
  import { useState, useEffect, useRef, useCallback } from 'react';
//import { useSelector, useDispatch } from "react-redux";
//import { setDuration, setTimeProgress } from '../../configureStore/musicSlice';


export const VolumeControls = ({audioRef, mini}) => {
 
    const [volume, setVolume] = useState(60);
    const [muteVolume, setMuteVolume] = useState(false);


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
    

    useEffect(()=> {
        if(audioRef){
            audioRef.current.volume = volume / 100;
            audioRef.current.muted = muteVolume;
        }
    }, [volume, audioRef, muteVolume]);



  return (
    <div className='volume w-40 flex self-center'>
    <button className='volBtn' onClick={()=>{setMuteVolume((prev) => !prev)}}>{muteVolume || volume < 5 ? (
        <IoMdVolumeOff />
    ) : volume < 40 ? (
        <IoMdVolumeLow />
    ) : (
        <IoMdVolumeHigh />
    )}</button>
    <input type='range'style={{background: `linear-gradient(to right, #f50 ${volume}%, #ccc ${volume}%)`}} 
     value={volume} min={0} max={100} onChange={(e)=>{setVolume(e.target.value)}} />
</div>
  )
}


// VolumeControls.propTypes = {
//     audioRef: PropTypes.object.isRequired,
//     mini: PropTypes.string 
// }