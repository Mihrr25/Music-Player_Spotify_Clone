import react, { useState, useContext, useEffect } from "react";
import { mycontext } from "../context";

const playbar = () => {
    const myctxt = useContext(mycontext);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    
    function handleClickSeeker(e){
        const rect = e.currentTarget.getBoundingClientRect();
        const offsetX = e.clientX - rect.left; // Offset of the click from the left edge of the element
        const width = rect.width; // Total width of the element
        
        const percentage = (offsetX / width) * 100;
        const seekTime = myctxt.audio.duration * (percentage / 100);
        myctxt.audio.currentTime = seekTime;
        
    }
    
    function handleClickPlay(event) {
        if (myctxt.audio.src) {
            if (myctxt.audio.paused) {
                myctxt.audio.play();
            }
            else {
                myctxt.audio.pause();
            }
        }
    }
    function handleClickNext(event){
        let cIndex=myctxt.cPlaylist.songs.indexOf(myctxt.currentSong);
        if(cIndex+1<myctxt.cPlaylist.songs.length){
            myctxt.playAudio(myctxt.cPlaylist.songs[cIndex+1])
        }
    }
    function handleClickPrevious(event){
        let cIndex=myctxt.cPlaylist.songs.indexOf(myctxt.currentSong);
        if(cIndex>0){
            myctxt.playAudio(myctxt.cPlaylist.songs[cIndex-1])
        }
    }
    
    useEffect(() => {
        const updateTime = () => {
            setCurrentTime(myctxt.audio.currentTime);
            setDuration(myctxt.audio.duration);
        };
        myctxt.audio.addEventListener("timeupdate", updateTime);
        myctxt.audio.addEventListener("ended", handleClickNext);
    }, [myctxt.audio]);

    function formatTime(seconds) {
        if (isNaN(seconds)) {
            return "00:00";
        }
        let minutes = Math.floor(seconds / 60);
        let remainingSeconds = Math.round(seconds) % 60;
        let formattedSeconds = ('0' + remainingSeconds).slice(-2);
        return `${minutes}:${formattedSeconds}`;
    }

    return (
        <div className="playbar">
            <div className="seeker" onClick={handleClickSeeker}>
                <div className="bar">
                    <div className="bar1" style={{ width: `${(currentTime / duration) * 100}%` }}></div>
                    <div className="bar2"></div>
                </div>
                <div className="circl" style={{ left: `${(currentTime / duration) * 100}%` }}></div>
            </div>
            <div className="play-main">
                {myctxt.currentSong.name.length ?
                    (<><div className="song-inform">
                        <div className="si-current">{formatTime(currentTime)}</div>
                        <div className="si-name">{myctxt.currentSong.name + " - " + myctxt.currentSong.artist}</div>
                        <div className="si-dur">{formatTime(duration)}</div>
                    </div>
                        <div className="song-info">{myctxt.currentSong.name + " - " + myctxt.currentSong.artist}</div></>) : ""
                }
                <div className="songButtons">
                    <svg xmlns="http://www.w3.org/2000/svg" data-encore-id="icon" role="img" aria-hidden="true"
                        viewBox="0 0 16 16" className="previous" onClick={handleClickPrevious}>
                        <path
                            d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z" />
                    </svg>
                    <img src={myctxt.audio.paused ? ("images/play.svg") : ("images/pause.svg")} alt="play" className="play-btn" onClick={handleClickPlay} />
                    <svg xmlns="http://www.w3.org/2000/svg" data-encore-id="icon" role="img" aria-hidden="true"
                        viewBox="0 0 16 16" className="next" onClick={handleClickNext}>
                        <path
                            d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z" />
                    </svg>
                </div>
                {myctxt.audio.src ? (<div className="duration">{`${formatTime(currentTime)} / ${formatTime(duration)}`}</div>) : ("")}
            </div>
        </div>
    )
}

export default playbar