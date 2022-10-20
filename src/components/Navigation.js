import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillHome, AiOutlineFileText } from 'react-icons/ai';
import LogOut from './LogOut';
import styled from 'styled-components';

const Navigation = () => {
  return (
    <NaviBox>
      <StyledLink to='/'>
        <AiFillHome className='icon' />
      </StyledLink>
      <StyledLink to='memo'>
        <AiOutlineFileText className='icon' />
      </StyledLink>
      <LogOut />
    </NaviBox>
  );
};

export default Navigation;

const NaviBox = styled.div`
  width: 100px;
  height: 50px;
  margin: 0 auto;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;

  &:focus,
  &:hover,
  &:link,
  &:active {
    text-decoration: none;
    color: gray;
  }

  .icon {
    font-size: 20px;
    margin: 10px;
  }
`;
