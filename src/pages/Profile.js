import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../fbase';

const Profile = () => {
  const navigation = useNavigate();
  const onLogOut = () => {
    authService.signOut();
    navigation('/');
  };
  return (
    <div>
      <button onClick={onLogOut}>LogOut</button>
    </div>
  );
};

export default Profile;
