import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillHome, AiOutlineFileText } from 'react-icons/ai';
import styled from 'styled-components';

const Navigation = () => {
  return (
    <>
      <StyledLink to='/'>
        <AiFillHome className='icon' />
        <p>HOME</p>
      </StyledLink>
      <StyledLink to='memo'>
        <AiOutlineFileText className='icon' />
        <p>MEMO</p>
      </StyledLink>
    </>
  );
};

export default Navigation;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  width: 20px;
  height: 20px;
  margin: 10px 20px;
  display: flex;

  &:focus,
  &:hover,
  &:link,
  &:active {
    text-decoration: none;
    color: white;
  }

  .icon {
    font-size: 20px;
    width: 20px;
    height: 20px;
  }
`;
