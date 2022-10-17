import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Main from '../pages/Main';
import Memo from '../pages/Memo';
import Navigation from './Navigation';

const Router = ({ isLogin, userObj }) => {
  return (
    <BrowserRouter>
      {isLogin && <Navigation />}
      <div>
        <Routes>
          {isLogin ? (
            <>
              <Route path='/' element={<Main userObj={userObj} />} />
              <Route path='/memo' element={<Memo />} />
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
