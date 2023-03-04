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
import PlayListSection from '../../pages/SinglePlayList';
import ArtistPage from '../../pages/ArtistPage';
import CategoryPage from '../../pages/CategoryPage';

const Header = () => {

  const [profileRoute, setProfileRoute] = useState("login-signup");
  const [userInfo, setUserInfo] = useState(null);
  const [musicInfo,setMusicInfo]=useState(null)
  const [data, setData] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout data={data} setData={setData} setMusicInfo={setMusicInfo} musicInfo={musicInfo} profileRoute={profileRoute} setProfileRoute={setProfileRoute} userInfo={userInfo} setUserInfo={setUserInfo} />}>
          <Route index element={<HomePage setMusicInfo={setMusicInfo} data={data} setData={setData} />} />
          <Route path="search" element={<SearchPage setMusicInfo={setMusicInfo} data={data} setData={setData} />} />
          <Route path="playlist" element={<PlaylistPage userInfo={userInfo} setMusicInfo={setMusicInfo} data={data} setData={setData} />} />
          <Route path="playlist/*" element={<PlayListSection setMusicInfo={setMusicInfo} data={data} setData={setData} />} />
          <Route path="login-signup" element={<LoginPage />} />
          <Route path='userprofile' element={<UserProfile userInfo={userInfo} setUserInfo={setUserInfo} setProfileRoute={setProfileRoute} />} />
          <Route path='uploadprofile' element={<UploadProfile userInfo={userInfo} />} />
          <Route path='userinformation' element={<UserInformation userInfo={userInfo} />} />
          <Route path='adminprofile' element={<AdminProfile userInfo={userInfo} setUserInfo={setUserInfo} setProfileRoute={setProfileRoute} />} />
          <Route path='uploadMusic' element={<UploadMusic userInfo={userInfo} />} />
          <Route path='artist/*' element={<ArtistPage data={data} setData={setData} setMusicInfo={setMusicInfo} />} />
          <Route path='category/*' element={<CategoryPage data={data} setData={setData} setMusicInfo={setMusicInfo} />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Header