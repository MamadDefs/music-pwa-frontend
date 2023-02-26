import React from 'react'
import PlayListSection from './SinglePlayList'
import NeedToLogin from '../componenets/NeedToLogin/NeedToLogin'
import PlayListListView from '../componenets/PlayListListView/PlayListListView'

const PlaylistPage = ({userInfo,setMusicInfo,data, setData}) => {
  

  return (
    <div className="page-content-holder">
        {userInfo ? <PlayListListView userInfo={userInfo}  setMusicInfo={setMusicInfo} data={data} setData={setData} /> : 
          <NeedToLogin />
        }
    </div>
  )
}

export default PlaylistPage