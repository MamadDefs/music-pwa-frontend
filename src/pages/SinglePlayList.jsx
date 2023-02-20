import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const SinglePlayList = () => {
    const  param  = useParams()
    const [playlistId,setPlaylistId]=useState()

    useEffect(()=>{
        setPlaylistId(param?.['*']);
    },[param])
    
    return (
        <div className="page-content-holder" style={{color:'white'}}>{playlistId}</div>
    )
}

export default SinglePlayList