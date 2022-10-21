import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../fbase';
import { ImExit } from 'react-icons/im';
import styled from 'styled-components';

const LogOut = () => {
  const navigation = useNavigate();
  const onLogOut = () => {
    authService.signOut();
    navigation('/');
  };
  return (
    <Logout onClick={onLogOut}>
      <ImExit className='logout-icon' />
    </Logout>
  );
};

export default LogOut;

const Logout = styled.div`
  cursor: pointer;
  width: 20px;
  height: 20px;
  position: absolute;
  top: 10px;
  right: 20px;
  /* margin: 10px 20px; */

  &:focus,
  &:hover,
  &:link,
  &:active {
    color: pink;
  }
  .logout-icon {
    font-size: 20px;
  }
`;
