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
      <Text>LOGOUT</Text>
    </Logout>
  );
};

export default LogOut;

const Logout = styled.div`
  cursor: pointer;
  color:gray;
  height: 20px;
  padding: 10px 30px;
  border: 1px solid gray;
  border-bottom: 0;
  border-radius: 5px 5px 0 0;
  position: absolute;
  right: 20px;

  &:focus,
  &:hover,
  &:active {
    color: whitesmoke;
    background-color: gray;
  }
  @media screen and (max-width: 460px) {
    right: 40px;
  }
  .logout-icon {
    font-size: 20px;
    width: 20px;
    height: 20px;
    @media screen and (min-width: 460px) {
      display: none;
    }
  }
`;

const Text = styled.p`
  @media screen and (max-width: 460px) {
    display: none;
  }
`;
