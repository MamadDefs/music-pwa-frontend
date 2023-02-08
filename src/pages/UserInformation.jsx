import React from 'react'

const UserInformation = ({ userInfo }) => {
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
                <h4>{userInfo?.type? userInfo?.type : 'معمولی‌'}</h4>
            </div>
        </div>
    )
}

export default UserInformation