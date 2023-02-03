import React, { useState } from 'react'
import LoadingOval from '../componenets/LoadingOval/LoadingOval'
const HomePage = () => {

  // request  300 - 20 ta to har safe
  // 300

  const [data, setData] = useState();

  // if (!data) return (<LoadingOval />)

  return (
    <div id="page-content-holder">
      <h2 className="music-section-title">موزیک های ویژه</h2>
      <div className="music-section">
        <div className="post">
          <img src="img/alf_labod.jpg" alt="" className="song-image" />
          <h3 className="song-name">Labod</h3>
          <h4 className="artist-name">Alf</h4>
        </div>
      </div>
      <div className="line"></div>
    </div>
  )
}

export default HomePage