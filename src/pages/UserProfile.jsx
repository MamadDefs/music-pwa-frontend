import React from 'react'

const UserProfile = () => {

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
        setFile(e.target.files[0])
    }

    const onSubmit = () => {

        const option = {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        };

        fetch('https://music-pwa-api.iran.liara.run/api/users/sign-in', option)
            .then((res) => res.json())
            .then((data) => {
                if (data.token) {
                    const d = new Date();
                    d.setTime(d.getTime() + (90 * 24 * 60 * 60 * 1000));
                    let expires = "expires=" + d.toUTCString();
                    document.cookie = `jwtToken=${data.token};${expires};path=/`;
                    if (data.userRole === 'admin') {
                        location.replace('/adminprofile');
                    } else if (data.userRole === 'user') {
                        location.replace('/userprofile');
                    }
                }

            })


    }
    return (
        <div id="page-content-holder">
            <div className="profile-holder">
                <img className="profile-image" src="/img/Mehrdad - Masale.jpg" alt="" />
                <h3>عکس جدیدی برای پروفایل خود آپلود کنید</h3>
                <form action="/users/profile/upload-image" method="post" encType="multipart/form-data">
                    <input type="file" name="profileImage" />

                </form>
                <button type="submit" className='submitBtn' value="submit" onClick={() => onSubmit()} >آپلود</button>
            </div>
            <div className="account-information">
                <br />
                <h3>نام کاربری</h3>
                <h4>saoshyant</h4>
                <br />
                <h3>ایمیل</h3>
                <h4>saoshyant1999@yahoo.com</h4>
                <br />
                <h3>نوع اکانت</h3>
                <h4>معمولی‌</h4>
                <button type="submit" onClick={() => deleteCookies()} className='exitBtn' value="submit" >خروج</button>
            </div>


        </div>
    )
}

export default UserProfile