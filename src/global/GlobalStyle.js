import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
  margin:0;
  padding:0;
}
body{
  background-color:#b2dfdb;
  color:#260503;
}
input{
  width:20vw;
  min-width:200px;
  height:20px;
  margin:5px;
  padding:10px;
  border:0;
  border-radius:10px;
  box-sizing: content-box;
  @media screen and (max-width: 460px) {
    width:80vw;
  }
}
button{
  width: 30px;
  height: 20px;
  border-radius:5px 5px 0 0;
  margin:0;
  border:0;
  cursor: pointer;
  text-align:center;
}
`;

export default GlobalStyle;
