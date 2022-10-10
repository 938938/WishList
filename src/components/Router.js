import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Main from '../pages/Main';
import Profile from '../pages/Profile';
import Navigation from './Navigation';

const Router = ({ isLogin }) => {
  return (
    <BrowserRouter>
      {isLogin && <Navigation />}
      <div>
        <Routes>
          {isLogin ? (
            <>
              <Route path='/' element={<Main />} />
              <Route path='/profile' element={<Profile />} />
            </>
          ) : (
            <Route path='/' element={<Login />} />
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Router;
