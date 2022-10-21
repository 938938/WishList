import React from 'react';
import Navigation from './Navigation';
import LogOut from './LogOut';
import styled from 'styled-components';

const Header = () => {
  return (
    <HeaderBox>
      <Navigation />
      <LogOut />
    </HeaderBox>
  );
};

export default Header;

const HeaderBox = styled.div`
  width: 400px;
  height: 50px;
  position: relative;
  display: flex;
  position: relative;
  justify-content: center;
  margin: 0 auto;
`;
