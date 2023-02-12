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
import UploadMusic from '../../pages/UploadMusic';
import UploadProfile from '../../pages/UploadProfile';
import UserInformation from '../../pages/UserInformation'

const Header = () => {

  const [profileRoute, setProfileRoute] = useState("login-signup");
  const [userInfo, setUserInfo] = useState(null);
  const [musicInfo,setMusicInfo]=useState(null)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout musicInfo={musicInfo} profileRoute={profileRoute} setProfileRoute={setProfileRoute} userInfo={userInfo} setUserInfo={setUserInfo} />}>
          <Route index element={<HomePage setMusicInfo={setMusicInfo} />} />
          <Route path="search" element={<SearchPage setMusicInfo={setMusicInfo} />} />
          <Route path="playlist" element={<PlaylistPage />} />
          <Route path="login-signup" element={<LoginPage />} />
          <Route path='userprofile' element={<UserProfile userInfo={userInfo} setUserInfo={setUserInfo} setProfileRoute={setProfileRoute} />} />
          <Route path='uploadprofile' element={<UploadProfile userInfo={userInfo} />} />
          <Route path='userinformation' element={<UserInformation userInfo={userInfo} />} />
          <Route path='adminprofile' element={<AdminProfile userInfo={userInfo} setUserInfo={setUserInfo} setProfileRoute={setProfileRoute} />} />
          <Route path='uploadMusic' element={<UploadMusic userInfo={userInfo} />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Header