import React, { useEffect,useState } from 'react'
import LoadingOval from '../componenets/LoadingOval/LoadingOval'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom'

const ArtistPage = ({data,setData,setMusicInfo}) => {
  const param = useParams()
  const [loading, setLoading] = useState(false)
  const [limit, setLimit] = useState(0);
  const [musicCount, setMusicCount] = useState(null);
  useEffect(() => {
    
    const option = {
      method: 'POST',
      body:JSON.stringify({
        artist:param?.['*']?.replace('%20',' '),
        limit:limit*9+9
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    };
    setLoading(true);
    fetch(`https://music-pwa-api.iran.liara.run/api/musics/artist`, option)
      .then((res) => res.json())
      .then((d) => {
        setData(d.musics);
        setMusicCount(d.count);
        setLoading(false);
      })
      
  }, []);

  const loadmore=()=>{
    setLimit(limit+1);
    const option = {
      method: 'POST',
      body:JSON.stringify({
        artist:param?.['*']?.replace('%20',' '),
        limit:(limit+1)*9+9
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    };
    setLoading(true);
    fetch(`https://music-pwa-api.iran.liara.run/api/musics/artist`, option)
      .then((res) => res.json())
      .then((d) => {
        setData(d.musics);
        setMusicCount(d.count);
        setLoading(false);
      })
  }
  
  return (
    <div className='page-content-holder'>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <h2 className="music-section-title">{param?.['*']}</h2>
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
      { musicCount>data?.length ? <div className='loadmore-btn' onClick={()=>loadmore()}>بیشتر نشان بده</div> : ''}
    </div>
  )
}

export default ArtistPage