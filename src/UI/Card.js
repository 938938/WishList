import React from 'react';
import styled from 'styled-components';

const Card = (props) => {
  return <CardBox>{props.children}</CardBox>;
};

export default Card;

const CardBox = styled.div`
  border: 1px solid black;
  width: 30vw;
  height: 120px;
  display: flex;
  padding: 10px;
  box-sizing: border-box;
`;
