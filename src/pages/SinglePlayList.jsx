import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SinglePlayList = ({ setMusicInfo, data, setData }) => {
    const param = useParams()
    const [playlistDetail, setPlaylistDetail] = useState();
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [loading, setLoading] = useState(false)

    const deleteMusic = (musicID) => {
        const jwtToken = document.cookie.split('=')[1];
        const option = {
          method: 'POST',
          body: JSON.stringify({
            playlistID:param?.['*'],
            musicID,
            jwtToken
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          }
        };
        setLoading(true);
        fetch(`https://music-pwa-api.iran.liara.run/api/playlists/delete-music`, option)
          .then((res) => res.json())
          .then((d) => {
            if (d?.error) {
              setError(d?.message)
            } else {        
            }
            fetchPlaylist();
            setLoading(false);
          })
      }

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }


    function getCurrentURL() {
        return window.location.href
    }

    const fetchPlaylist=()=>{
        const option = {
            method: 'POST',
            body: JSON.stringify({
                id: param?.['*']
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        };

        fetch('https://music-pwa-api.iran.liara.run/api/playlists/id/id', option)
            .then((res) => res.json())
            .then((d) => {
                setPlaylistDetail({ title: d?.title, user: d?.user });
                setData(d?.musics);
            })

    }

    useEffect(() => {
        fetchPlaylist();
    }, [])

    const copyToTheClipboard = () => {
        navigator.clipboard.writeText(getCurrentURL()).then(function () {
            console.log('Async: Copying to clipboard was successful!');
            handleClick();
            setMessageType('success');
            setMessage('لینک اشتراک گذاری با موفقیت کپی');
        }, function (err) {
            console.error('Async: Could not copy text: ', err);
            handleClick();
            setMessageType('error');
            setMessage('خطا در کپی کردن');
        });
    }

    return (
        <div className="page-content-holder" style={{ color: 'white' }}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={messageType} sx={{ position: 'absolute', bottom: '0%', right: '0%', zIndex: 100 }}>
                    {message}
                </Alert>
            </Snackbar>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <h2 className="plylist-section-title"><ShareRoundedIcon onClick={() => copyToTheClipboard()} />{playlistDetail?.title}</h2>
            <div className="music-section">
                {data?.map((q, index) => {
                    return (
                        <div key={index} className="post">
                            <img src={q?.coverImagePath} alt=""  onClick={() => setMusicInfo(q)}  onDoubleClick={()=>deleteMusic(q?._id)} className="song-image" />
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