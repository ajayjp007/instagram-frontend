import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage/HomePage';
import Login from './Pages/Login/Login';
import NewPost from './Pages/NewPost/NewPost';
import OtherProfile from './Pages/OtherProfiles/OtherProfiles';
import Profile from './Pages/ProfilePage/Profile';
import SignUp from './Pages/Signup/SignUp';

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Navigate to="/login-page" />}></Route>
      <Route path="/signup-page" element={<SignUp />}></Route>
      <Route path="/login-page" element={<Login />}></Route>
      
      <Route path="/home-page" element={<HomePage />}></Route>
      <Route path="/newPost-page" element={<NewPost />}></Route>
      <Route path="/UserProfile-page" element={<Profile />}></Route>
      <Route path='/other-profile' element={<OtherProfile />}></Route>
    </Routes>
  );
}

export default App;
