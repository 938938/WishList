import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../fbase';

const LogOut = () => {
  const navigation = useNavigate();
  const onLogOut = () => {
    authService.signOut();
    navigation('/');
  };
  return <button onClick={onLogOut}>LogOut</button>;
};

export default LogOut;
