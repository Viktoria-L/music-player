
import {  IoPlayBack,
    IoPlayForward,
    IoPlaySkipBack,
    IoPlaySkipForward,
    IoPlay,
    IoPause } from 'react-icons/io5';


import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { handleNext, handlePrevious, setDuration, setTimeProgress } from '../configureStore/musicSlice';
// import PropTypes from 'prop-types';


export const PlayControls = ({audioRef, progressBarRef, mini}) => {
    const dispatch = useDispatch();
    // const trackIndex = useSelector((state) => state.musicInStore.trackIndex);
    // const currentTrack = useSelector((state) => state.musicInStore.currentTrack);
    // const timeProgress = useSelector((state) => state.musicInStore.timeProgress);
    const duration = useSelector((state) => state.musicInStore.duration);   
    
    const [isPlaying, setIsPlaying] = useState(false);


    const togglePlayPause = () => {
        setIsPlaying((prevState) => !prevState);
    }

    const playAnimationRef = useRef();
    const repeat = useCallback(() => {
        const currentTime = audioRef.current.currentTime;
        dispatch(setTimeProgress(currentTime));
        progressBarRef.current.value = currentTime;
        progressBarRef.current.style.setProperty(
          '--range-progress',
          `${(progressBarRef.current.value / duration) * 100}%`
        );
    
        playAnimationRef.current = requestAnimationFrame(repeat);
      }, [audioRef, duration, progressBarRef, setTimeProgress]);

    useEffect(()=> {
        if(isPlaying){
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
        playAnimationRef.current = requestAnimationFrame(repeat);
    }, [isPlaying, audioRef, repeat]);

   
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
    

  return (
    <div className={`controls flex text-center ${mini}`}>
    <button onClick={()=>{dispatch(handlePrevious())}}>
        <IoPlaySkipBack  className='text-sm' />
    </button>
    {/* <button onClick={skipBackward} className='skip'>
        <IoPlayBack className='skip' />
    </button> */}
    <button onClick={togglePlayPause}>
        {isPlaying ? <IoPause className='text-sm'  /> : <IoPlay className='text-sm' />}
    </button>
    {/* <button onClick={skipForward} className='skip'>
        <IoPlayForward />
    </button> */}
    <button onClick={()=>{dispatch(handleNext())}}>
        <IoPlaySkipForward className='text-sm'  />
    </button>

</div>
  )
}

// PlayControls.propTypes = {
//     audioRef: PropTypes.object.isRequired,
//     progressBarRef: PropTypes.object.isRequired,
//     mini: PropTypes.string 
// }