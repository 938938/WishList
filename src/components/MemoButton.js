import React from 'react';
import styled from 'styled-components';

const MemoButton = ({ onClick, text }) => {
  return <MemoBtn onClick={onClick}>{text}</MemoBtn>;
};

export default MemoButton;

const MemoBtn = styled.button`
  width: 80px;
  height: 30px;
  margin: 10px;
  border-radius: 10px;
`;
