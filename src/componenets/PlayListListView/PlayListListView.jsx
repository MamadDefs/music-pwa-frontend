import React, { useState, useEffect } from 'react'
import './PlayListListView.css'
import LoadingOval from '../LoadingOval/LoadingOval'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius:'0.75rem',
  display:'flex',
  flexDirection:'column',
  justifyContent:'space-between',
  alignItem:'center',
  '*':{
    marginTop:'8px'
    }
};

const PlayListListView = ({ userInfo, setMusicInfo, data, setData }) => {

  const [loading, setLoading] = useState(false)
  const [playlists, setPlaylists] = useState()
  const [showModal, setShowModal] = useState(false);
  const [formTitle,setFormTitle]=useState('');
  const [error,setError]=useState('')

  const openModal = () => { setShowModal(true) }
  const closeModal = () => { setShowModal(false); setError(''); }
  const changeTitle=(e)=>{
    setFormTitle(e.target.value)
  }
  const createPlaylist=()=>{
    const jwtToken = document.cookie.split('=')[1];
    const option = {
      method: 'POST',
      body: JSON.stringify({
        title:formTitle,
        jwtToken
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    };
    fetch(`https://music-pwa-api.iran.liara.run/api/playlists/create`, option)
      .then((res) => res.json())
      .then((d) => {
        if(d?.error){
          setError(d?.message)
        } else {
          closeModal();
        }
      })
  }


  useEffect(() => {
    const jwtToken = document.cookie.split('=')[1];
    const option = {
      method: 'POST',
      body: JSON.stringify({
        jwtToken
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    };
    setLoading(true);
    fetch(`https://music-pwa-api.iran.liara.run/api/playlists`, option)
      .then((res) => res.json())
      .then((d) => {
        setPlaylists(d?.playlists);
        setLoading(false);
      })

  }, [showModal]);
  console.log(playlists)
  return (
    <div className='playlistListHolder'>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Modal
        open={showModal}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {error ? <Typography id="modal-modal-title" sx={{color:'red'}} variant="h6" component="h2">
            {error}
          </Typography> : ''}
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ایجاد پلی لیست جدید
          </Typography>
          <TextField id="outlined-basic" onChange={(e)=>changeTitle(e)} label="نام پلی لیست" variant="outlined" />
          <Button variant="contained" onClick={()=>createPlaylist()}>ایجاد</Button>
        </Box>
      </Modal>

      <div className='create-playlist-btn' onClick={() => openModal()}>
        <AddCircleOutlineRoundedIcon sx={{ color: 'white', fontSize: '35px' }} />
        اضافه کردن
      </div>
      {playlists ?
        playlists?.map((playlist) => {
          return (
            <Link to={`/playlist${playlist?._id ? `/${playlist?._id}` : ''}`}>
              <div className='single-playlist-item'>
                <p>{playlist?.title}</p>
                <p> تعداد آهنگ ها : {playlist?.musics?.length}</p>
              </div>
            </Link>
          )
        })
        : <p style={{ color: 'white', margin: 'auto', width: '50%' }}>شما هنوز پلی لیستی ندارید</p>}
    </div>
  )
}

export default PlayListListView