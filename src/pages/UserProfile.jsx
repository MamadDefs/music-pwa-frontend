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

  return (
    <div id="page-content-holder">
            <div className="profile-holder">
                <img  className="profile-image" src="/img/Mehrdad - Masale.jpg" alt=""/>
                <h3>عکس جدیدی برای پروفایل خود آپلود کنید</h3>
                <form action="/users/profile/upload-image" method="post" encType="multipart/form-data">
                    <input type="file" name="profileImage"/>
                    
                </form>
                <button type="submit" className='submitBtn' value="submit" >آپلود</button>
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
                <button type="submit" onClick={()=>deleteCookies()} className='exitBtn' value="submit" >خروج</button>
            </div>
            
            
        </div>
  )
}

export default UserProfile