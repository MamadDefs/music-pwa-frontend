import React from 'react'

const UserProfile = () => {
  return (
    <div id="page-content-holder">
            <div className="profile-holder">
                <img  className="profile-image" src="/img/Mehrdad - Masale.jpg" alt=""/>
                <h3>عکس جدیدی برای پروفایل خود آپلود کنید</h3>
                <form action="/users/profile/upload-image" method="post" encType="multipart/form-data">
                    <input type="file" name="profileImage"/>
                    <button type="submit" value="submit" >آپلود</button>
                </form>
            </div>
            <div className="account-information">
                <br/>
                <h3>نام کاربری</h3>
                <h4>saoshyant</h4>
                <br/>
                <h3>ایمیل</h3>
                <h4>saoshyant1999@yahoo.com</h4>
                <br/>
                <h3>نوع اکانت</h3>
                <h4>معمولی‌</h4>
            </div>
        </div>
  )
}

export default UserProfile