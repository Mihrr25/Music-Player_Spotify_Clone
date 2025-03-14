import react, { useContext, useEffect } from "react";
import { mycontext } from "../context";

const playlist = ({abt}) => {
    const myctxt = useContext(mycontext);
        function handleClick(event){
        let id=event.currentTarget.dataset.folder;
        myctxt.setCPlaylist(abt);
        console.log("clicked",myctxt.cPlaylist);
    }
    
    return (
        <div className="card" data-folder={abt._id} onClick={handleClick}>
            <div className="play">
                <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24"
                    className="Svg-sc-ytk21e-0 bneLcE">
                    <path
                        d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z" />
                </svg>
            </div>
            <img src={abt.image} alt="Arijit Singh" />
            <h2>{abt.title}</h2>
            <p>{abt.description}</p>
        </div>
    )
}

export default playlist