import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, redirect } from "react-router-dom";
import LoadingOval from '../componenets/LoadingOval/LoadingOval';

const HomePage = ({setMusicInfo}) => {



  const [data, setData] = useState([]);

  useEffect(() => {
    const jwtToken = document.cookie.split('=')[1];
    const option = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    };
    fetch('https://music-pwa-api.iran.liara.run/api/musics/all', option)
      .then((res) => res.json())
      .then((d) => {
        setData(d.musics)
      })
  }, []);


  if (!data) return (<LoadingOval />)

  return (
    <div className="page-content-holder">
      <h2 className="music-section-title">موزیک های ویژه</h2>
      <div className="music-section">
        {data.map((q, index) => {
          return (
            <div key={index} className="post">
              <img src={q?.coverImagePath} alt="" onClick={()=>setMusicInfo(q)} className="song-image" />
              <h3 className="song-name">{q?.title}</h3>
              <h4 className="artist-name">{q?.artist?.map(r => { return (r + " ") })}</h4>
            </div>
          )
        })}
      </div>
      <div className="line"></div>
    </div>
  )
}

export default HomePage