import React, { useState, useEffect } from 'react'


const MusicPlayer = ({ musicInfo }) => {

  const playingButton=()=>{
    let music=document.getElementById('musicPlayer');
    console.log(music)
  }

  return (
    <div>
      <p onClick={playingButton} style={{ color: 'white' }}>play</p>
      <audio id="musicPlayer" src={musicInfo?.musicPath} autoPlay={true} controls={true}/>
    </div>
  )
}

export default MusicPlayer