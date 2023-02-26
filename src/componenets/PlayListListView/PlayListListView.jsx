import React, { useState, useEffect } from 'react'
import './PlayListListView.css'
import LoadingOval from '../LoadingOval/LoadingOval'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';

const PlayListListView = ({ userInfo, setMusicInfo, data, setData }) => {

  const [loading, setLoading] = useState(false)
  const [playlists,setPlaylists]=useState()

  useEffect(() => {
    const jwtToken = document.cookie.split('=')[1];
    const option = {
      method: 'POST',
      body: JSON.stringify({
        user: userInfo,
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
        setPlaylists(d?.playlistWithMusics);
        setLoading(false);
      })

  }, []);
  console.log(data)
  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {playlists ?
        playlists?.map((playlist) => {
          return (
            <Link to={`/playlist${playlist?.id ? `/${playlist?.id}` : ''}`}>
              <div className='single-playlist-item'>
                <p>{playlist?.title}</p>
                <p> تعداد آهنگ ها : {playlist?.musics?.length}</p>
            </div>
            </Link>
          )
        })
        : <p style={{color:'white',margin:'auto',width:'50%'}}>شما هنوز پلی لیستی ندارید</p>}
    </div>
  )
}

export default PlayListListView