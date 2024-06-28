import react, { useContext, useEffect } from "react";
import { mycontext } from "../context";

const modaloptions = ({ abt, sid ,setAtp}) => {
  const myctxt = useContext(mycontext);
  async function addToPlaylist() {
    let mysong = myctxt.cPlaylist.songs.find(e => e._id == sid)
    console.log(mysong,myctxt.cPlaylist)
    let song ={
        name: mysong.name,
        artist: mysong.artist,  
        link: mysong.link,
        simage: myctxt.cPlaylist.image
      }
    
    try {
      let response = await fetch('http://localhost:5000/api/addSong', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: myctxt.currentUID.username, playlist: abt._id,song:song })
      });
      console.log("clicked")
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      let data = await response.json();
      if (data) {
        myctxt.setCurrentUID(data);
        myctxt.setContainer(data.playlist);
        myctxt.setCPlaylist(data.playlist.find(el=>el._id===abt._id))
        localStorage.setItem("sUser",JSON.stringify(data))
        localStorage.setItem("isUser","true")
        myctxt.setIsUser(true)
        setAtp(false);
        console.log(myctxt.currentUID)
      }
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <div className="option" onClick={addToPlaylist}>{abt.title}</div>
  )
}

export default modaloptions