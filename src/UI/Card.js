import React from 'react';
import styled from 'styled-components';

const Card = (props) => {
  return <CardBox>{props.children}</CardBox>;
};

export default Card;

const CardBox = styled.div`
  background-color: white;
  width: 30vw;
  height: 120px;
  display: flex;
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
  box-sizing: border-box;
  @media screen and (max-width: 460px) {
    width: 90vw;
  }
`;
