import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillHome, AiOutlineFileText } from 'react-icons/ai';
import styled from 'styled-components';

const Navigation = () => {
  return (
    <NavBox>
      <StyledLink to='/'>
        <AiFillHome className='icon' />
        <NaviMenu>HOME</NaviMenu>
      </StyledLink>
      <StyledLink to='memo'>
        <AiOutlineFileText className='icon' />
        <NaviMenu>MEMO</NaviMenu>
      </StyledLink>
    </NavBox>
  );
};

export default Navigation;

const NavBox = styled.div`
  width: 225px;
  display: flex;
  justify-content: space-between;
  margin-left: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  border: 1px solid black;
  border-bottom: 0;
  border-radius: 5px 5px 0 0;
  height: 20px;
  padding: 10px 30px;
  display: flex;

  &:focus,
  &:hover,
  &:active {
    text-decoration: none;
    color: white;
    background-color: black;
  }

  .icon {
    font-size: 20px;
    width: 20px;
    height: 20px;
    @media screen and (min-width: 460px) {
      display: none;
    }
  }
`;

const NaviMenu = styled.p`
  @media screen and (max-width: 460px) {
    display: none;
  }
  font-size: 18px;
`;
