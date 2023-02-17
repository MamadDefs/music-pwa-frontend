import React, { useState, useEffect } from 'react'
import PlayArrowRoundsedIcon from '@mui/icons-material/PlayArrowRounded';
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import CloseFullscreenRoundedIcon from '@mui/icons-material/CloseFullscreenRounded';
import OpenInBrowserRoundedIcon from '@mui/icons-material/OpenInBrowserRounded';

const MusicPlayer = ({ musicInfo }) => {

  const [isMaximize,setIsMaximize]= useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const play = () => {
    document.getElementById('musicPlayer').play()
  }

  const pause = () => {
    document.getElementById('musicPlayer').pause()
  }

  const playingButton = () => {


    if (isPlaying) {
      setIsPlaying(false);
      pause();
    } else {
      setIsPlaying(true);
      play();
    }
  }

  const changeProgress = (e) => {
    const currentTime  = document.getElementById('musicPlayer').currentTime;
    const duration = document.getElementById('musicPlayer').duration;

    setProgress(parseInt((currentTime / duration) * 100))
    
    if(progress>=99){
      document.getElementById('musicPlayer').currentTime=0;
      setProgress(0);
      play();
    }
  }

  const changeValue=(e)=>{
    const duration = document.getElementById('musicPlayer').duration;
    document.getElementById('musicPlayer').currentTime=e.target.value/100*duration;
  }

  return (
    <div className={isMaximize ? 'musicPlayerHolder' : 'musicPlayerHolderMin' }>
      { isMaximize
        ?
        <div className='minimize-btn' onClick={()=>setIsMaximize(false)}>
            <CloseFullscreenRoundedIcon sx={{fontSize:30}} />
        </div>
        :
        <div className='maximize-btn' onClick={()=>setIsMaximize(true)} >
          <OpenInBrowserRoundedIcon sx={{fontSize:25}} />
        </div>}
        {isMaximize ?
      <div className='musicPlayerInnerHolder'>
      
        <div className={isPlaying ? 'musicPlayerImagePlaying' : 'musicPlayerImage'}>
          <img src={musicInfo?.coverImagePath} />
        </div>
        
        <div className='musicPlayerInfo'>
          <h2>{musicInfo?.title}</h2>
          <h3>{musicInfo?.artist}</h3>
        </div>
        
        <div className='musicPlayerProgress'>
          <input type='range' min={1} max={100} className='range' value={progress} onChange={(e)=>changeValue(e)}  />
        </div> 
        
          <div className='musicPlayerControler' >
          <div className='playingButton'>
            <SkipNextRoundedIcon sx={sx} />
            {!isPlaying ? 
            <PlayArrowRoundsedIcon sx={sx} onClick={playingButton} /> :
             <StopRoundedIcon sx={sx} onClick={playingButton} />}
             <SkipPreviousRoundedIcon sx={sx} />
          </div>
          </div>
      </div>
       : 
       <div className='musicPlayerInnerHolderMin'> 
          <div className={isPlaying ? 'musicPlayerImagePlayingMin' : 'musicPlayerImageMin'}>
          <img src={musicInfo?.coverImagePath} />
        </div>
        <div className='playingButtonMin'>
            <SkipNextRoundedIcon sx={sx2} />
            {!isPlaying ? 
            <PlayArrowRoundsedIcon sx={sx2} onClick={playingButton} /> :
             <StopRoundedIcon sx={sx2} onClick={playingButton} />}
             <SkipPreviousRoundedIcon sx={sx2} />
          </div>
       </div>
       }
          <audio id="musicPlayer" onTimeUpdate={(e) => changeProgress(e)} src={musicInfo?.musicPath} autoPlay={true} controls={false} />
    </div>
  )
}

let sx={fontSize:50}
let sx2={fontSize:35}


export default MusicPlayer