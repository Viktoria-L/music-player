import DisplayTrack from "./DisplayTrack";
import Controls from "./Controls";
import ProgressBar from "../ProgressBar";
import { useEffect, useRef } from 'react';
// import { tracks } from '../../assets/music/tracks';
import { useSelector } from "react-redux";


//Parent,root component
const AudioPlayer = ({musicData}) => {

    const tracks = useSelector((state) => state.musicInStore.tracksFromApi)
    useEffect(() => {
console.log("Tracks", tracks)
    }, [tracks])
    
    const audioRef = useRef();
    const progressBarRef = useRef();

    return (
        <div className="audio-player max-w-md">
            <div className="inner m-auto flex flex-col justify-center gap-4 p-4 max-w-7xl">
            <DisplayTrack {...{ audioRef, progressBarRef, tracks }} />
            <ProgressBar {...{ progressBarRef, audioRef, tracks }} />
            <Controls {...{audioRef, progressBarRef, tracks }} />
            </div>
        </div>
    )
}

export default AudioPlayer;