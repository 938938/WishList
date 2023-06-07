import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillHome, AiOutlineFileText } from 'react-icons/ai';
import styled from 'styled-components';

const Navigation = () => {
  const [selected, setSelected] = useState('HOME');
  const onClickHandler = (e) => {
    const { innerText } = e.target;
    setSelected(innerText);
  };
  return (
    <NavBox>
      <StyledLink
        to='/'
        className={selected === 'HOME' ? 'selected' : ''}
        onClick={onClickHandler}
      >
        <AiFillHome className='icon' />
        <NaviMenu>HOME</NaviMenu>
      </StyledLink>
      <StyledLink
        to='memo'
        className={selected === 'MEMO' ? 'selected' : ''}
        onClick={onClickHandler}
      >
        <AiOutlineFileText className='icon' />
        <NaviMenu>MEMO</NaviMenu>
      </StyledLink>
    </NavBox>
  );
};

export default Navigation;

const NavBox = styled.div`
  width: 225px;
  @media screen and (max-width: 460px) {
    width: 180px;
  }
  display: flex;
  justify-content: space-between;
  margin-left: 20px;

  .selected {
    text-decoration: none;
    color: white;
    background-color: black;
  }
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

  &:hover {
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
