import React from "react";
import styled from 'styled-components';

const Line = () => {
  return <LineDiv />;
};

export default Line;

const LineDiv = styled.div`
  width: 80vw;
  height: 1px;
  margin: 20px auto;
  background-color: black;
`;