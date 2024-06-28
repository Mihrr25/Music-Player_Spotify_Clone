import react, { useContext, useEffect, useState } from "react";
import { mycontext } from "../context";
import { Link } from 'react-router-dom'

const rnav = () => {
    const myctxt = useContext(mycontext);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 1400px)');
        setIsMobile(mediaQuery.matches);
    }, [])

    function handleLogOut(){
        myctxt.setCurrentUID({})
        localStorage.removeItem('sUser');
        localStorage.removeItem('isUser');
        myctxt.setIsUser(false)

    }
    function handleHamburger(){
        myctxt.setLeftBox(true);
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

    return (
        <div className="nav flex">
            <div className="sign">
                {isMobile ? (<div className="hamburger" onClick={handleHamburger} >
                    <img src="images/hamburger.svg" alt="hamburger" />
                </div>) : ""}

                <div className="nav-button-1" onClick={handleClickPrevious}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" data-encore-id="icon" role="img" aria-hidden="true"
                        viewBox="0 0 16 16">
                        <path
                            d="M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8 9.97.47a.75.75 0 0 1 1.06 0z" />
                    </svg>
                </div>
                <div className="nav-button-1" onClick={handleClickNext}>
                    <svg xmlns="http://www.w3.org/2000/svg" data-encore-id="icon" role="img" aria-hidden="true"
                        className="Svg-sc-ytk21e-0 cAMMLk IYDlXmBmmUKHveMzIPCF" viewBox="0 0 16 16">
                        <path
                            d="M4.97.47a.75.75 0 0 0 0 1.06L11.44 8l-6.47 6.47a.75.75 0 1 0 1.06 1.06L13.56 8 6.03.47a.75.75 0 0 0-1.06 0z" />
                    </svg>
                </div>
            </div>
            <div className="nav-sign">
                {myctxt.currentUID.username ? (<button className="sign-in">{myctxt.currentUID.username}</button>) : <></>}
                {myctxt.currentUID.username ? (<button className="logg" onClick={handleLogOut}>Log out</button>) : (<Link to="/login"><button className="logg">Get Stareted</button></Link>)}

            </div>
        </div>
    )
}

export default rnav