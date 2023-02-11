import React, { useState } from 'react'
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


const UploadMusic = () => {


    const [loading, setLoading] = useState(false)

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState('');
    const [artist, setArtist] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [music, setMusic] = useState('');

    const titleChange = (e) => {
        setTitle(e.target.value);
    }

    const descChange = (e) => {
        setDesc(e.target.value);
    }
    const categoryChange = (e) => {
        setCategory(e.target.value);
    }
    const artistChange = (e) => {
        setArtist(e.target.value);
    }
    const onChangeCoverImage = (e) => {
        setCoverImage(e.target.files[0]);
    }
    const onChangeMusic = (e) => {
        setMusic(e.target.files[0]);
    }

    const onClick = (e) => {
        e.preventDefault();
        const jwtToken = document.cookie.split('=')[1];
        const formData = new FormData();
        formData.append("coverImage", coverImage);
        formData.append("music", music);
        formData.append("title", title);
        formData.append("desc", desc);
        formData.append("category", category);
        formData.append("artist", artist);
        formData.append("jwtToken", jwtToken);
        try {
            setLoading(true);
            axios.post(
                "https://music-pwa-api.iran.liara.run/api/musics/upload-music",
                formData
            ).then((res) => { })
                .then((data) => {
                    setLoading(false);
                });
    
        } catch (ex) {
            setLoading(false);
            console.log(ex);
        }
    }


    return (
        <div className='form-holder'>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <form className='upload-music-form'>
                <input type="text" placeholder="نام آهنگ" onChange={(e) => titleChange(e)} value={title} />
                <input type="text" placeholder="توضیحات آهنگ" onChange={(e) => descChange(e)} value={desc} />
                <input type="text" placeholder="دسته بندی" onChange={(e) => categoryChange(e)} value={category} />
                <input type="text" placeholder="خواننده ها" onChange={(e) => artistChange(e)} value={artist} />
                <label>عکس آهنگ را آپلود کنید</label>
                <input type="file" name="coverImage" onChange={(e) => onChangeCoverImage(e)} />
                <label>آهنگ را آپلود کنید</label>
                <input type="file" name="music" onChange={(e) => onChangeMusic(e)} />
                <button type="submit" className='form-btn' onClick={(e) => onClick(e)}>ایجاد موزیک</button>
            </form>

        </div>
    )
}

export default UploadMusic