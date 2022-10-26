import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Main from '../pages/Main';
import Memo from '../pages/Memo';
import Header from './Header';

const Router = ({ isLogin, userObj }) => {
  return (
    <BrowserRouter>
      {isLogin && <Header />}
      <div>
        <Routes>
          {isLogin ? (
            <>
              <Route path='/' element={<Main userObj={userObj} />} />
              <Route path='/memo' element={<Memo userObj={userObj} />} />
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
