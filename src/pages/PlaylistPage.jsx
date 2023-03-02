import React from 'react'
import PlayListSection from './SinglePlayList'
import NeedToLogin from '../componenets/NeedToLogin/NeedToLogin'
import PlayListListView from '../componenets/PlayListListView/PlayListListView'

const PlaylistPage = ({userInfo,setMusicInfo,data, setData}) => {
  
  if(!userInfo) return(<NeedToLogin />)
  return (
    <div className="page-content-holder">
        <PlayListListView userInfo={userInfo}  setMusicInfo={setMusicInfo} data={data} setData={setData} />
    </div>
  )
}

export default PlaylistPage