import react, { useContext, useEffect, useState } from "react";
import { mycontext } from "../context";
import { Link } from 'react-router-dom'
import './modalcs.css'
import Modaloptions from "./modaloptions";
const modal = ({ atp, setAtp, sid }) => {
    const myctxt = useContext(mycontext);
    const [createNew, setCreateNew] = useState(false);
    const [existing, setExisting] = useState(false);
    const [playlistName, setPlaylistName] = useState("");
    function closeModal(e) {
        setAtp(false)
    }
    function createPlay() {
        setCreateNew(true)
    }
    console.log(myctxt.currentUID.playlist)
    function handleChangeInInput(e) {
        let current = e.target.value;
        setPlaylistName(current);
        console.log(current);
        if (myctxt.currentUID.playlist.find(el => el.title === current)) {
            setExisting(true);
        }
        else { setExisting(false); }

    }
    async function handleSubmitonC(e) {
        e.preventDefault();
        if(existing)return;
        try {let response = await fetch('http://localhost:5000/api/addPlaylist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: myctxt.currentUID.username,playlistName:playlistName})
        });
        console.log("clicked")
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let data = await response.json();
        console.log(data);
        if (data) {
            localStorage.setItem("isUser","true");
            myctxt.setIsUser(true);
            myctxt.currentUID.playlist.push(data);
            localStorage.setItem('sUser',JSON.stringify(myctxt.currentUID))
            console.log("Hello",myctxt.currentUID.playlist);
            setAtp(false);
            setAtp(true);
            setCreateNew(false)
        } 
    } catch (error) {
        console.log(error)
    }
    }
    return (
        <div className="modal-content">

            <div className="close-btn-top" >
                <svg xmlns="http://www.w3.org/2000/svg" onClick={closeModal} className="close-btn-top-1" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19.0005 4.99988L5.00045 18.9999M5.00045 4.99988L19.0005 18.9999" />
                </svg>
                {
                    createNew ? (<>
                        <form className="myForm" onSubmit={handleSubmitonC}>
                            <input
                                type="text"
                                name="Playlist_Name"
                                id="PlaylistName"
                                placeholder="Create New Playlist"
                                autoFocus
                                required
                                value={playlistName}
                                onChange={handleChangeInInput}
                            />
                            <button type="submit" className="sBtn">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" color="#218261" fill="#218261">
                                    <path d="M14.236 5.29178C14.236 4.77191 14.236 4.51198 14.1789 4.29871C14.0238 3.71997 13.5717 3.26793 12.9931 3.11285C12.4315 2.96238 11.5684 2.96238 11.0068 3.11285C10.4281 3.26793 9.97609 3.71997 9.82101 4.29871C9.76387 4.51198 9.76387 4.77191 9.76387 5.29178C9.76387 6.34588 9.76387 9.109 9.43641 9.43647C9.10894 9.76393 6.34582 9.76393 5.29172 9.76393C4.77185 9.76393 4.51192 9.76393 4.29865 9.82107C3.71991 9.97615 3.26787 10.4282 3.11279 11.0069C2.96232 11.5685 2.96232 12.4315 3.11279 12.9931C3.26787 13.5718 3.71991 14.0239 4.29865 14.1789C4.51192 14.2361 4.77185 14.2361 5.29172 14.2361C6.34582 14.2361 9.10894 14.2361 9.43641 14.5635C9.76387 14.891 9.76387 15.418 9.76387 16.4721C9.76387 16.992 9.76387 19.4881 9.82101 19.7013C9.97609 20.28 10.4281 20.7321 11.0068 20.8871C11.5684 21.0376 12.4315 21.0376 12.9931 20.8871C13.5717 20.7321 14.0238 20.28 14.1789 19.7013C14.236 19.4881 14.236 16.992 14.236 16.4721C14.236 15.418 14.236 14.891 14.5635 14.5635C14.8909 14.2361 17.654 14.2361 18.7082 14.2361C19.228 14.2361 19.488 14.2361 19.7013 14.1789C20.28 14.0239 20.732 13.5718 20.8871 12.9931C21.0376 12.4315 21.0376 11.5685 20.8871 11.0069C20.732 10.4282 20.28 9.97615 19.7013 9.82107C19.488 9.76393 19.228 9.76393 18.7082 9.76393C17.654 9.76393 14.8909 9.76393 14.5635 9.43647C14.236 9.109 14.236 6.34588 14.236 5.29178Z" stroke="#218261" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                        </form>
                    </>) : (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="close-btn-top-1" width="30" height="30" fill="#1fd740" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" onClick={createPlay}>
                        <path d="M7.50304 4C7.48421 3.62851 7.55185 3.34156 7.73579 3.1C8.19267 2.5 9.12335 2.5 10.9847 2.5H13.0153C14.8766 2.5 15.8073 2.5 16.2642 3.1C16.4481 3.34156 16.5158 3.62851 16.497 4" />
                        <path d="M5 8C5.03784 7.74037 5.12478 7.51593 5.26968 7.31431C5.85493 6.5 7.0681 6.5 9.49444 6.5H14.5056C16.9319 6.5 18.1451 6.5 18.7303 7.31431C18.8752 7.51593 18.9622 7.74037 19 8" />
                        <path d="M3.81753 15.7128L4.53641 18.016C5.43193 20.8852 6.19729 21.5 9.21027 21.5H14.7897C17.8027 21.5 18.5681 20.8852 19.4636 18.016L20.1825 15.7128C20.9261 13.3303 21.2979 12.139 20.7101 11.3195C20.1223 10.5 18.896 10.5 16.4434 10.5H7.55662C5.104 10.5 3.8777 10.5 3.28988 11.3195C2.70207 12.139 3.07389 13.3303 3.81753 15.7128Z" />
                    </svg>)
                }
            </div>
            {existing ? (<p className="Pexist">Playlist already Exist</p>) : (<></>)}
            <div className="modal-header">
                {myctxt.currentUID.playlist.length ? (<h2>Select Playlist</h2>) : (<> <h2>Create Playlist</h2></>)}
            </div>
            <div className="playlist-options">
                {myctxt.currentUID.playlist.map((ele, index) => (
                    <Modaloptions key={index} abt={ele} sid={sid} setAtp={setAtp} />
                ))}
                {/* Add more options as needed */}
            </div>
        </div>
    )
}

export default modal