import react, { useContext, useEffect } from "react";
import { mycontext } from "../context";
import Playlist from "./playlist";
import Playbar from "./playbar";
import Rnav from "./rnav";

const right = () => {
    const myctxt = useContext(mycontext);
    return (
        <div className="right m10">
            
            <div className="main">
                <Rnav/>
                <div className="spotifyPlaylists">
                    <h1>{myctxt.isUser?("Your Playlists"):("Spotify Playlists")}</h1>
                    <div className="cardContainer">
                        {myctxt.container.map((ele, index) => (
                            <Playlist key={index} abt={ele} />
                        ))}
                    </div>
                </div>
                <Playbar/>
                
            </div>

        </div>
    )
}

export default right