import react,{ useContext,useRef,useState,useEffect } from "react";
import { mycontext } from "../context";
import Songlist from "./songlist";

const left = () => {
    const myctxt=useContext(mycontext);
    const [isMobile, setIsMobile] = useState(false);
    

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 1400px)');
        setIsMobile(mediaQuery.matches);
    }, []) 

    const myRef=useRef();

    if (myctxt.leftBox&&myRef.current) {
        myRef.current.style.zIndex =1;
    }
    if (myctxt.leftBox==false &&myRef.current&&isMobile) {
        myRef.current.style.zIndex =-1;
    }
    if(!isMobile&&myRef.current){
        myRef.current.style.zIndex =1;
    }
    function handleCross(){
        myctxt.setLeftBox(false);
    }
    function handleHome(){
        if(myctxt.isUser){
            console.log("Home Clicked")
            myctxt.setContainer(myctxt.local);
            myctxt.setIsUser(false);
            localStorage.setItem("isUser","false")
        }
    }
    function handleLib(){
        if(!myctxt.isUser&&myctxt.currentUID.username){
            myctxt.setContainer(myctxt.currentUID.playlist);
            myctxt.setIsUser(true);
            localStorage.setItem("isUser","true")
        }
    }
    useEffect(() => {
    if(myctxt.cPlaylist.songs.length){
        myctxt.playAudio(myctxt.cPlaylist.songs[0]);
    }
    
    }, [myctxt.cPlaylist])
    
    const myref=useRef(null)
    useEffect(() => {
      if(!myctxt.currentUID.username){
        if(myref.current){
            myref.current.style.cursor="not-allowed"
        }
      }
      else{
        if(myref.current){
            myref.current.style.cursor="pointer"
        }
      }
    
    }, [myctxt.currentUID])
    

    return (
        <>
        <div ref={myRef} className='left bg-black m10'>
            <div className="home bg-grey">
                {isMobile?(<div className="close-left" >
                    <img src="images/cross.svg" alt="cross" onClick={handleCross} />
                </div>):(<></>)}
                
                <div className="logo">
                    <img className="invert" src="images/logo.svg" alt="spotify"/>
                </div>
                <ul>
                <li style={{ color: myctxt.isUser ? '#b0b0b0' : 'white' } } onClick={handleHome} ><svg baseProfile="tiny" height="30px" id="Layer_1" version="1.2" viewBox="0 0 24 24" width="30px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill={myctxt.isUser?("#b0b0b0"):("white")}><path d="M12,3c0,0-6.186,5.34-9.643,8.232C2.154,11.416,2,11.684,2,12c0,0.553,0.447,1,1,1h2v7c0,0.553,0.447,1,1,1h3  c0.553,0,1-0.448,1-1v-4h4v4c0,0.552,0.447,1,1,1h3c0.553,0,1-0.447,1-1v-7h2c0.553,0,1-0.447,1-1c0-0.316-0.154-0.584-0.383-0.768  C18.184,8.34,12,3,12,3z"/></svg>Home</li>
                <li style={{ color: !myctxt.isUser ? '#b0b0b0' : 'white' }} ref={myref} onClick={handleLib}>
                    <svg height="30" viewBox="0 0 24 24" width="30" fill={!myctxt.isUser?("#b0b0b0"):("white")} xmlns="http://www.w3.org/2000/svg"><path d="M13 16.493C13 18.427 14.573 20 16.507 20s3.507-1.573 3.507-3.507c0-.177-.027-.347-.053-.517H20V6h2V4h-3a1 1 0 0 0-1 1v8.333a3.465 3.465 0 0 0-1.493-.346A3.51 3.51 0 0 0 13 16.493zM2 5h14v2H2z"/><path d="M2 9h14v2H2zm0 4h9v2H2zm0 4h9v2H2z"/></svg>Your Playlists
                    </li>
                </ul>
            </div>
            <div className="library bg-grey">
                <div className="lib-head flex align">
                    <img src="images/library.svg" alt="library"/> Your Library
                </div>
                <div className="ul">
                {myctxt.cPlaylist.songs.map((ele, index) => (
                            <Songlist key={index} abt={ele} iml={myctxt.cPlaylist.image} />
                        ))}
                </div>
                <div className="foot-box flex align">
                    <a href="https://www.spotify.com/in-en/legal/">Legal</a>
                    <a href="https://www.spotify.com/in-en/safetyandprivacy/">Safety &amp; Privacy Center</a>
                    <a href="https://www.spotify.com/in-en/legal/privacy-policy/">Privacy Policy</a>
                    <a href="https://www.spotify.com/in-en/legal/cookies-policy/">Cookies</a>
                    <a href="https://www.spotify.com/in-en/legal/privacy-policy/#s3">About Ads</a>
                    <a href="https://www.spotify.com/in-en/accessibility/">Accessibility</a>
                </div>
            </div>

        </div>
        </>
    )
}

export default left