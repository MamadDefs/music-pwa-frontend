import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import PlayArrowRoundsedIcon from '@mui/icons-material/PlayArrowRounded';
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import CloseFullscreenRoundedIcon from '@mui/icons-material/CloseFullscreenRounded';
import OpenInBrowserRoundedIcon from '@mui/icons-material/OpenInBrowserRounded';
import PlaylistAddRoundedIcon from '@mui/icons-material/PlaylistAddRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '0.75rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItem: 'center',
  '*': {
    marginTop: '8px'
  }
};


const MusicPlayer = ({ userInfo, musicInfo, setMusicInfo, data }) => {

  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [isMaximize, setIsMaximize] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false)
  const [playlists, setPlaylists] = useState()
  const [isLiked, setIsLiked] = useState(musicInfo?.likers?.includes(userInfo?._id) ? true : false)
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const likeSong = () => {
    const jwtToken = document.cookie.split('=')[1];
    const option = {
      method: 'POST',
      body: JSON.stringify({
        jwtToken
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    };
    setLoading(true);
    fetch(`https://music-pwa-api.iran.liara.run/api/musics/like/${musicInfo?._id}`, option)
      .then((res) => res.json())
      .then((d) => {
        setLoading(false);
        setIsLiked(!isLiked)
      })
  }

  const openModal = () => { setShowModal(true) }
  const closeModal = () => { setShowModal(false) }


  useEffect(() => {
    setIsPlaying(true);
  }, [musicInfo])

  useEffect(() => {
    setIsMaximize(false);
  }, [location])

  useEffect(() => {
    const jwtToken = document.cookie.split('=')[1];
    const option = {
      method: 'POST',
      body: JSON.stringify({
        jwtToken
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    };
    setLoading(true);
    fetch(`https://music-pwa-api.iran.liara.run/api/playlists`, option)
      .then((res) => res.json())
      .then((d) => {
        setPlaylists(d?.playlists)
        setLoading(false);
      })
  }, [userInfo])

  const addToPlaylist = (playlistID) => {
    const jwtToken = document.cookie.split('=')[1];
    const option = {
      method: 'POST',
      body: JSON.stringify({
        jwtToken,
        playlistID,
        music: musicInfo?._id
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    };

    setLoading(true);
    fetch(`https://music-pwa-api.iran.liara.run/api/playlists/add-to-playlist`, option)
      .then((res) => res.json())
      .then((d) => {
        setLoading(false);
        if (!d?.error) {
          closeModal();
          handleClick();
          setMessageType('success');
          setMessage('عملیات موفقیت آمیز بود');
        } else {
          handleClick();
          setMessageType('error');
          setMessage(d?.message);
        }
      })
  }

  const play = () => {
    document.getElementById('musicPlayer').play()
  }

  const goNext = () => {
    const dataCount = data.length
    const index = data.findIndex(q => q._id == musicInfo?._id) + 1
    if (index > dataCount - 1) {
      setMusicInfo(data?.[0])
    } else {
      setMusicInfo(data?.[index])
    }
  }

  const goPrev = () => {
    const dataCount = data.length
    const index = data.findIndex(q => q._id == musicInfo?._id) - 1
    if (index < 0) {
      setMusicInfo(data?.[dataCount - 1])
    } else {
      setMusicInfo(data?.[index])
    }
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
    const currentTime = document.getElementById('musicPlayer').currentTime;
    const duration = document.getElementById('musicPlayer').duration;

    setProgress(parseInt((currentTime / duration) * 100));

    if (progress >= 99) {
      document.getElementById('musicPlayer').currentTime = 0;
      setProgress(0);
      play();
    }
  }

  const changeValue = (e) => {
    const duration = document.getElementById('musicPlayer').duration;
    document.getElementById('musicPlayer').currentTime = e.target.value / 100 * duration;
  }

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={messageType} sx={{ position: 'absolute', bottom: '0%', right: '0%', zIndex: 100 }}>
          {message}
        </Alert>
      </Snackbar>
      <div className={isMaximize ? 'musicPlayerHolder' : 'musicPlayerHolderMin'}>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Modal
          open={showModal}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>

            <Typography id="modal-modal-title" variant="h6" component="h2">
              پلی لیست ها
              {playlists ? playlists?.map((sp, index) => {
                return (
                  <div key={index} className='playlistTitleView' onClick={() => addToPlaylist(sp?._id)}>{sp?.title}</div>
                )
              }) : ''}
            </Typography>

          </Box>
        </Modal>

        {isMaximize
          ?
          <div className='minimize-btn' onClick={() => setIsMaximize(false)}>
            <CloseFullscreenRoundedIcon sx={{ fontSize: 30 }} />
          </div>
          :
          <div className='maximize-btn' onClick={() => setIsMaximize(true)} >
            <OpenInBrowserRoundedIcon sx={{ fontSize: 25 }} />
          </div>}
        {isMaximize ?
          <div className='musicPlayerInnerHolder'>

            <div className={isPlaying ? 'musicPlayerImagePlaying' : 'musicPlayerImage'}>
              <img src={musicInfo?.coverImagePath} />
            </div>

            <div className='info-option'>
              <div className='musicPlayerInfo'>
                <h2>{musicInfo?.title}</h2>
                <h3>{musicInfo?.artist}</h3>

              </div>
              <div className='musicOptions'>
                <PlaylistAddRoundedIcon sx={sx2} onClick={() => openModal()} />
                {!isLiked ?
                  <FavoriteBorderRoundedIcon sx={sx2} onClick={() => likeSong()} /> :
                  <FavoriteRoundedIcon sx={sx2} onClick={() => likeSong()} />}
              </div>
            </div>


            <div className='musicPlayerProgress'>
              <input type='range' min={1} max={100} className='range' value={progress} onChange={(e) => changeValue(e)} />
            </div>

            <div className='musicPlayerControler' >
              <div className='playingButton'>
                <SkipNextRoundedIcon sx={sx} onClick={goNext} />
                {!isPlaying ?
                  <PlayArrowRoundsedIcon sx={sx} onClick={playingButton} /> :
                  <StopRoundedIcon sx={sx} onClick={playingButton} />}
                <SkipPreviousRoundedIcon sx={sx} onClick={goPrev} />
              </div>
            </div>
          </div>
          :
          <div className='musicPlayerInnerHolderMin'>
            <div className={isPlaying ? 'musicPlayerImagePlayingMin' : 'musicPlayerImageMin'}>
              <img src={musicInfo?.coverImagePath} />
            </div>
            <div className='playingButtonMin'>
              <SkipNextRoundedIcon sx={sx2} onClick={goNext} />
              {!isPlaying ?
                <PlayArrowRoundsedIcon sx={sx2} onClick={playingButton} /> :
                <StopRoundedIcon sx={sx2} onClick={playingButton} />}
              <SkipPreviousRoundedIcon sx={sx2} onClick={goPrev} />
            </div>
          </div>
        }
        <audio id="musicPlayer" onTimeUpdate={(e) => changeProgress(e)} src={musicInfo?.musicPath} autoPlay={true} controls={false} />
      </div>
    </div>
  )
}

let sx = { fontSize: 50 }
let sx2 = { fontSize: 35 }


export default MusicPlayer