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
  width: 90vw;
  border-bottom: 1px solid black;
  display: flex;
  position: relative;
  margin: 0 auto;
  margin-top:30px;
`;
