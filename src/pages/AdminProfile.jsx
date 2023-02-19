import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import axios from 'axios'
import HelpCenterOutlinedIcon from '@mui/icons-material/HelpCenterOutlined';
import ImageIcon from '@mui/icons-material/Image';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { Link } from "react-router-dom";

const AdminProfile = ({ userInfo, setUserInfo, setProfileRoute }) => {

    const navigate = useNavigate();
    function deleteCookies() {
        var allCookies = document.cookie.split(';');

        // The "expire" attribute of every cookie is 
        // Set to "Thu, 01 Jan 1970 00:00:00 GMT"
        for (var i = 0; i < allCookies.length; i++)
            document.cookie = allCookies[i] + "=;expires="
                + new Date(0).toUTCString();

        setUserInfo(null);
        setProfileRoute('/login-signup');
        navigate('/login-signup')
    }
    // const [file, setFile] = useState(null);

    // const onChangeFile = (e) => {
    //     console.log(e.target.files[0])
    //     setFile(e.target.files[0])
    // }

    // const onSubmit = () => {
    //     const jwtToken = document.cookie.split('=')[1];

    //     const formData = new FormData();
    //     formData.append("profileImage", file);
    //     formData.append("jwtToken", jwtToken);
    //     try {
    //         const res = axios.post(
    //             "https://music-pwa-api.iran.liara.run/api/users/profile/upload-image",
    //             formData
    //         );
    //         console.log(res);
    //     } catch (ex) {
    //         console.log(ex);
    //     }

    // }

    return (
        <div className="page-content-holder">
            <div className='panel-cart-section'>
                <Link to='/userinformation'>
                    <div className='panel-cart' style={{ color: 'white' }}>
                        <HelpCenterOutlinedIcon />
                        <h3>اطلاعات کاربری</h3>
                    </div>
                </Link>
                <Link to='/uploadprofile'>
                    <div className='panel-cart' style={{ color: 'white' }}>
                        <ImageIcon />
                        <h3>آپلود پروفایل</h3>
                    </div>
                </Link>
                <Link to='/uploadMusic'>
                    <div className='panel-cart' style={{ color: 'white' }}>
                        <MusicNoteIcon />
                        <h3>آپلود آهنگ</h3>
                    </div>
                </Link>
                <div className='panel-cart' style={{ color: 'red' }} onClick={deleteCookies}>
                    <HelpCenterOutlinedIcon />
                    <h3>خروج</h3>
                </div>

            </div>
        </div>
    )
}

export default AdminProfile

