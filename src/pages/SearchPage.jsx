import React,{useEffect, useState} from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


const SearchPage = ({setMusicInfo,data, setData}) => {

  const [loading, setLoading] = useState(false)
  useEffect(()=>{
    setData(null);
  },[])

  const searchChange = (e) => {
    let searchTerm = e.target.value;
    if (searchTerm.length >= 3) {
      const option = {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      };
      setLoading(true);
      fetch(`https://music-pwa-api.iran.liara.run/api/musics/search?q=${searchTerm}`, option)
        .then((res) => res.json())
        .then((d) => {
          setData(d.musics)
          setLoading(false)
        })
    } else {
      setData(null);
    }
  }
  return (
    <div className='page-content-holder'>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="flexbox">
        <div className="search">
          <h2>برای جستجو بر روی آیکون ذره بین کلیک کنید</h2>
          <div>
            <input type="text" placeholder="جستجو . . ." onChange={(e) => searchChange(e)} required />
          </div>
        </div>
      </div>
      <div className="music-section">
        {data?.map((q, index) => {
          return (
            <div key={index} className="post">
              <img src={q?.coverImagePath} alt="" onClick={() => setMusicInfo(q)} className="song-image" />
              <h3 className="song-name">{q?.title}</h3>
              <h4 className="artist-name">{q?.artist?.map(r => { return (r + " ") })}</h4>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SearchPage