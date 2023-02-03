import React, { useState, useEffect } from 'react'
import { Outlet, Link, useLocation, redirect } from "react-router-dom";


const Layout = ({ profileRoute, setProfileRoute, setUserInfo }) => {


    const location = useLocation();

    useEffect(() => {

        const jwtToken = document.cookie.split('=')[1];
        const option = {
            method: 'POST',
            body: JSON.stringify({
                jwtToken
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        };

        fetch('https://music-pwa-api.iran.liara.run/api/users/auth', option)
            .then((res) => res.json())
            .then((data) => {
                if (jwtToken) {
                    if (data?.isLogin) {
                        setUserInfo(data?.user)
                        if (data?.user?.role == 'admin') {
                            setProfileRoute('/adminprofile')
                        } else if (data?.user?.role == 'user') {
                            setProfileRoute('/userprofile')
                        }
                    } else {
                        setProfileRoute("/login-signup")
                    }
                }
            })

    }, [location])



    return (
        <div>
            <header className='header' id='header'>
                <div className='nav-container-top'>
                    <a href="#" className="nav__logo">Marlon</a>
                    <img src="/img/Mehrdad - Masale.jpg" alt="" className="nav__img" />
                </div>
                <nav className='nav-container'>
                    <div className='nav__menu' id="nav-menu">
                        <ul className="nav__list">
                            <Link to="/">
                                <li className="nav__item" id="home-btn" >
                                    <div className="nav__link">
                                        <i className='bx bx-home-alt nav__icon'></i>
                                        <span className="nav__name">خانه</span>
                                    </div>
                                </li>
                            </Link>
                            <Link to="/search">
                                <li className="nav__item" id="search-btn">
                                    <div className="nav__link">
                                        <i className='bx bx-search-alt nav__icon'></i>
                                        <span className="nav__name">جستجو</span>
                                    </div>
                                </li>
                            </Link>
                            <Link to="/playlist">
                                <li className="nav__item" id="playlist-btn">
                                    <div className="nav__link">
                                        <i className='bx bx-book-alt nav__icon'></i>
                                        <span className="nav__name">پلی لیست</span>
                                    </div>
                                </li>
                            </Link>
                            <Link to={profileRoute} >
                                <li className="nav__item" id="profile-btn">
                                    <div className="nav__link">
                                        <i className='bx bx-user nav__icon'></i>
                                        <span className="nav__name">حساب کاربری</span>
                                    </div>
                                </li>
                            </Link>
                        </ul>
                    </div>
                </nav>
            </header>
            <Outlet />
        </div>
    )
}

export default Layout