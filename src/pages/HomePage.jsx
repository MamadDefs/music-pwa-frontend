import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, redirect } from "react-router-dom";
import LoadingOval from '../componenets/LoadingOval/LoadingOval'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


const HomePage = ({setMusicInfo}) => {



  const [data, setData] = useState(null);
  const [musicCount, setMusicCount] = useState(null);
  const [limit, setLimit] = useState(0);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const jwtToken = document.cookie.split('=')[1];
    const option = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    };
    setLoading(true);
    fetch(`https://music-pwa-api.iran.liara.run/api/musics/all?page=1&limit=${limit*3+3}`, option)
      .then((res) => res.json())
      .then((d) => {
        setData(d.musics)
        setLoading(false);
      })
      fetch('https://music-pwa-api.iran.liara.run/api/musics/count', option)
      .then((res) => res.json())
      .then((d) => {
        setMusicCount(d.count)
      })
  }, []);


  const loadmore=()=>{
    setLimit(limit+1);
    const option = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    };
    setLoading(true);
    fetch(`https://music-pwa-api.iran.liara.run/api/musics/all?page=1&limit=${(limit+1)*9+9}`, option)
      .then((res) => res.json())
      .then((d) => {
        setLoading(false);
        setData(d.musics)
      })
  }

  var test={
    backgroundColor:'white'
  }
  if (!data) return (<LoadingOval />)

  return (
    <div className="page-content-holder">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <h2 className="music-section-title">موزیک های ویژه</h2>
      <div className="music-section">
        {data?.map((q, index) => {
          return (
            <div key={index} className="post">
              <img src={q?.coverImagePath} alt="" onClick={()=>setMusicInfo(q)} className="song-image" />
              <h3 className="song-name">{q?.title}</h3>
              <h4 className="artist-name">{q?.artist?.map(r => { return (r + " ") })}</h4>
            </div>
          )
        })}
      </div>
      <div className='loadmore-btn' onClick={()=>loadmore()}>بیشتر نشان بده</div>
    </div>
  )
}



export default HomePage