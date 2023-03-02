import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const SinglePlayList = ({ setMusicInfo, data, setData }) => {
    const param = useParams()
    const [playlistTitle, setPlaylistTitle] = useState();

    useEffect(() => {

        const jwtToken = document.cookie.split('=')[1];
        const option = {
            method: 'POST',
            body: JSON.stringify({
                jwtToken,
                id: param?.['*']
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        };

        fetch('https://music-pwa-api.iran.liara.run/api/playlists/id/id', option)
            .then((res) => res.json())
            .then((d) => {
                setPlaylistTitle(d?.title);
                setData(d?.musics);
            })

    }, [param])



    return (
        <div className="page-content-holder" style={{ color: 'white' }}>
            <h2 className="music-section-title">{playlistTitle}</h2>
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

export default SinglePlayList