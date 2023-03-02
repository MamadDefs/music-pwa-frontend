import React from 'react'
import NeedToLogin from '../componenets/NeedToLogin/NeedToLogin'

const UserInformation = ({ userInfo }) => {
    if(!userInfo) return(<NeedToLogin />)
    return (
        <div className="page-content-holder">
            <div className="account-information">
                <br />
                <h3>نام کاربری</h3>
                <h4>{userInfo?.username}</h4>
                <br />
                <h3>ایمیل</h3>
                <h4>{userInfo?.email}</h4>
                <br />
                <h3>نوع اکانت</h3>
                <h4>{userInfo?.role=='admin' ? 'مدیر' : 'معمولی‌'}</h4>
            </div>
        </div>
    )
}

export default UserInformation