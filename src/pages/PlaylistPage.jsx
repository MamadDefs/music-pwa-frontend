import React from 'react'
import PlayListSection from './SinglePlayList'
import NeedToLogin from '../componenets/NeedToLogin/NeedToLogin'
import PlayListListView from '../componenets/PlayListListView/PlayListListView'

const PlaylistPage = ({userInfo,setMusicInfo,data, setData}) => {
  

  return (
    <div className="page-content-holder">
        {userInfo ? <PlayListListView /> : 
          <NeedToLogin />
        }
    </div>
  )
}

export default PlaylistPage