import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../../pages/Layout";
import HomePage from "../../pages/HomePage";
import SearchPage from "../../pages/SearchPage";
import PlaylistPage from "../../pages/PlaylistPage";
import LoginPage from "../../pages/LoginPage";
import NoPage from '../../pages/NoPage';
import UserProfile from '../../pages/UserProfile';
import AdminProfile from '../../pages/AdminProfile';

const Header = () => {

  const [profileRoute, setProfileRoute] = useState("login-signup");
  const [userInfo, setUserInfo] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout profileRoute={profileRoute} setProfileRoute={setProfileRoute} userInfo={userInfo} setUserInfo={setUserInfo} />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="playlist" element={<PlaylistPage />} />
          <Route path="login-signup" element={<LoginPage />} />
          <Route path='userprofile' element={<UserProfile userInfo={userInfo} />} />
          <Route path='adminprofile' element={<AdminProfile userInfo={userInfo} />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Header