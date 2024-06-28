import react, { useState, useContext, useEffect } from "react";
import { mycontext } from "../context";
import Left from "./left"
import Right from "./right"

const mainpage = () => {
  const myctxt = useContext(mycontext);
  let ui = localStorage.getItem('sUser');
  let isUse = localStorage.getItem('isUser');
  useEffect(() => {
    (async function () {
      let user = await fetch("http://localhost:5000/localPlay");
      let arr = await user.json();
      if (ui) {
        myctxt.setCurrentUID(JSON.parse(ui));
      }
      if (isUse) {
        if (isUse == "false") {
          myctxt.setContainer(arr);
          myctxt.setIsUser(false)
        }
        else {
          myctxt.setIsUser(true)
          myctxt.setContainer(JSON.parse(ui).playlist);
        }
      }
      else{
        myctxt.setContainer(arr);
          myctxt.setIsUser(false)
      }
      myctxt.setLocal(arr);
    })();
  }, [])

  function handleKeyPress(){
    if (myctxt.audio.src) {
      if (myctxt.audio.paused) {
          myctxt.audio.play();
      }
      else {
          myctxt.audio.pause();
      }
  }
  }
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);
  return (
    <>
      <Left />
      <Right />
    </>
  )
}

export default mainpage