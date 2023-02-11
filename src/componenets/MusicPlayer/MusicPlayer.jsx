import React from 'react'

const MusicPlayer = ({musicInfo}) => {
  return (
    <div>
      <audio src={musicInfo?.musicPath} autoPlay={true}/>
    </div>
  )
}

export default MusicPlayer