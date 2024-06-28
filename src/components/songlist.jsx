import react, { useContext, useEffect,useRef,useState } from "react";
import { mycontext } from "../context";
import Modal from "./modal";
const songlist = ({ abt, iml }) => {
    const [atp, setAtp] = useState(false);
    const myctxt = useContext(mycontext);
    if(abt.simage)iml=abt.simage;
    function handleClick(event) {
        let id = event.currentTarget.dataset.file;
        myctxt.playAudio(myctxt.cPlaylist.songs.find(ele => ele._id === id))
    }
    function handleADD(event){
        if(!myctxt.currentUID.username){
            return;
        }
        console.log("Yes Iam there")
        setAtp(true);
    }
    const myref=useRef(null);
    useEffect(() => {
        if(!myctxt.currentUID.username){
            if(myref.current){
                myref.current.style.cursor="not-allowed";
            }
        }
        else{
            if(myref.current){
                myref.current.style.cursor="pointer";
            }
        }
    }, [myctxt.currentUID])
    
    return (
        <div className="songl flex align justify">
            {atp?(<Modal atp={atp} setAtp={setAtp} sid={abt._id}/>):(<></>)}
            <div className="li align" title="play" data-file={abt._id} onClick={handleClick}>
                <img src={iml} alt={abt.name} />
                <div className="song-text">
                    <div className="sName">{abt.name}</div>
                    <div className="artist">{abt.artist}</div>
                </div>
                <div className="play">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" color="#000000" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                        <path
                            d="M9.5 11.1998V12.8002C9.5 14.3195 9.5 15.0791 9.95576 15.3862C10.4115 15.6932 11.0348 15.3535 12.2815 14.6741L13.7497 13.8738C15.2499 13.0562 16 12.6474 16 12C16 11.3526 15.2499 10.9438 13.7497 10.1262L12.2815 9.32594C11.0348 8.6465 10.4115 8.30678 9.95576 8.61382C9.5 8.92086 9.5 9.6805 9.5 11.1998Z"
                            fill="currentColor" />
                    </svg>
                </div>
            </div>
            <div className="satp" ref={myref} data-file={abt._id}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="35" height="35" color="#000000" fill="none" onClick={handleADD}>
                    <path d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                    <path d="M4.64856 5.07876C4.7869 4.93211 4.92948 4.7895 5.0761 4.65111M7.94733 2.72939C8.12884 2.6478 8.31313 2.57128 8.5 2.5M2.5 8.5C2.57195 8.31127 2.64925 8.12518 2.73172 7.94192" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M12 8V16M16 12L8 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
        </div>
    )
}

export default songlist