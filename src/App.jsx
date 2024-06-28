import { useState, useEffect } from 'react'
import './components/style.css'
import './components/utility.css'
import { mycontext } from "./context";
import Mainpage from './components/mainpage';
import Login from './components/login';
import Sighin from './components/sighin';
import { createBrowserRouter, RouterProvider,BrowserRouter } from 'react-router-dom'
// current song, songs array,current container
function App() {
  const [audio, setAudio] = useState(new Audio());
  const [container, setContainer] = useState([]);
  const [local, setLocal] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [cPlaylist, setCPlaylist] = useState({songs:[],image:""});
  const [currentSong, setCurrentSong] = useState({name:"",artist: ""});
  const [currentUID, setCurrentUID] = useState("");
  const [leftBox, setLeftBox] = useState(false);
  const [isUser, setIsUser] = useState(false);
  function playAudio(source){
    setCurrentSong(source)
    audio.src=source.link;
    audio.load();
    audio.play();
}
  let contextWriter={
    isUser,
    setIsUser,
    audio,
    setAudio,
    currentSong,
    setCurrentSong,
    container,
    local,
    setLocal,
    setContainer,
    playlist,
    setPlaylist,
    cPlaylist,
    setCPlaylist,
    playAudio,
    setCurrentUID,
    currentUID,
    leftBox,
    setLeftBox
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Mainpage/></>
    },
    {
      path: "/login",
      element: <><Login/></>
    },
    {
      path: "/signin",
      element: <><Sighin/></>
    }
  ])

  


  return (
    <>
      <mycontext.Provider value={contextWriter}>
      <RouterProvider router={router} />
      </mycontext.Provider>
    </>
  )
}

export default App
