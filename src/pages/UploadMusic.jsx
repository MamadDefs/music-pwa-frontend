import React, { useState } from 'react'

const UploadMusic = () => {

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState('');
    const [artist, setArtist] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [musicLink, setMusicLink] = useState('');

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
    const imageLinkChange = (e) => {
        setImageLink(e.target.value);
    }
    const musicLinkChange = (e) => {
        setMusicLink(e.target.value);
    }

    const onClick = () => {
        const jwtToken = document.cookie.split('=')[1];
        const option = {
            method: 'POST',
            body: JSON.stringify({
                title,
                desc,
                category,
                artist,
                coverImage: imageLink,
                musicLink,
                jwtToken
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        };

        fetch('https://music-pwa-api.iran.liara.run/api/musics/upload-music', option)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
            })


    }


    return (
        <div className='form-holder'>
            <form >
                <input type="text" placeholder="نام آهنگ" onChange={(e) => titleChange(e)} value={title} />
                <input type="text" placeholder="توضیحات آهنگ" onChange={(e) => descChange(e)} value={desc} />
                <input type="text" placeholder="دسته بندی" onChange={(e) => categoryChange(e)} value={category} />
                <input type="text" placeholder="خواننده ها" onChange={(e) => artistChange(e)} value={artist} />
                <input type="text" placeholder="لینک تصویر آهنگ" onChange={(e) => imageLinkChange(e)} value={imageLink} />
                <input type="text" placeholder="لینک آهنگ" onChange={(e) => musicLinkChange(e)} value={musicLink} />
            </form>
            <button type="submit" className='form-btn' onClick={onClick}>ایجاد موزیک</button>
        </div>
    )
}

export default UploadMusic