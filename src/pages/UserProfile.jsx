import React, { useState } from 'react'
import axios from 'axios'
const UserProfile = ({ userInfo }) => {

    function deleteCookies() {
        var allCookies = document.cookie.split(';');

        // The "expire" attribute of every cookie is 
        // Set to "Thu, 01 Jan 1970 00:00:00 GMT"
        for (var i = 0; i < allCookies.length; i++)
            document.cookie = allCookies[i] + "=;expires="
                + new Date(0).toUTCString();

        location.replace("/");
    }
    const [file, setFile] = useState(null);

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
            const res = axios.post(
                "https://music-pwa-api.iran.liara.run/api/users/profile/upload-image",
                formData
            );
            console.log(res);
        } catch (ex) {
            console.log(ex);
        }

        // const option = {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         jwtToken,
        //         profileImage: file
        //     }),
        //     // files: {
        //     //     profileImage: file
        //     // },
        //     headers: {
        //         // 'Content-type': 'application/json; charset=UTF-8',
        //         'content-type': file.type,
        //         'content-length': `${file.size}`
        //     }
        // };

        // fetch('https://music-pwa-api.iran.liara.run/api/users/profile/upload-image', option)
        //     .then((res) => res.json())
        //     .then((data) => {
        //         console.log(data)
        //     })
    }

    const defaultProfileImageUrl = "https://music-pwa-api.iran.liara.run/img/default.png";
    return (
        <div id="page-content-holder">
            <div className="profile-holder">
                <img className="profile-image" src={userInfo?.profileImage ? userInfo?.profileImage : defaultProfileImageUrl} alt="" />
                <h3>عکس جدیدی برای پروفایل خود آپلود کنید</h3>
                <form action="/users/profile/upload-image" method="post" encType="multipart/form-data">
                    <input type="file" name="profileImage" onChange={(e) => onChangeFile(e)} />
                </form>
                <button type="submit" className='submitBtn' value="submit" onClick={() => onSubmit()} >آپلود</button>
            </div>
            <div className="account-information">
                <br />
                <h3>نام کاربری</h3>
                <h4>{userInfo?.username}</h4>
                <br />
                <h3>ایمیل</h3>
                <h4>{userInfo?.email}</h4>
                <br />
                <h3>نوع اکانت</h3>
                <h4>معمولی‌</h4>
                <button type="submit" onClick={() => deleteCookies()} className='exitBtn' value="submit" >خروج</button>
            </div>
        </div>
    )
}

export default UserProfile