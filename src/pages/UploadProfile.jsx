import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const UploadProfile = ({ userInfo }) => {

    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false)

    const onChangeFile = (e) => {
        console.log(e.target.files[0])
        setFile(e.target.files[0])
    }

    const onSubmit = () => {
        const jwtToken = document.cookie.split('=')[1];

        const formData = new FormData();
        formData.append("profileImage", file);
        formData.append("jwtToken", jwtToken);
        try {
            setLoading(true);
            const res = axios.post(
                "https://music-pwa-api.iran.liara.run/api/users/profile/upload-image",
                formData
            ).then((res) => { })
            .then((data) => {
                setLoading(false);
                navigate('/uploadprofile')
            });
        } catch (ex) {
            setLoading(false);
            console.log(ex);
        }

    }

    return (
        <div className="page-content-holder">
             <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className='uploadprofile-holder'>
                <img src={userInfo?.profileImage ? userInfo?.profileImage : ''} className='profileImage' />
                <h3>عکس پروفایل جدید را آپلود کنید</h3>
                <form action="/users/profile/upload-image" method="post" encType="multipart/form-data">
                    <input type="file" name="profileImage" onChange={(e) => onChangeFile(e)} />
                </form>
                <button type="submit" className='submitBtn' value="submit" onClick={() => onSubmit()} >آپلود</button>
            </div>
        </div>
    )
}

export default UploadProfile