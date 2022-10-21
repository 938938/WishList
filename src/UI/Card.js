import React from 'react';
import styled from 'styled-components';

const Card = ({ props }) => {
  return <CardBox>{props.children}</CardBox>;
};

export default Card;

const CardBox = styled.div``;
