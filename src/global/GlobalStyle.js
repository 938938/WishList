import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
  margin:0;
  padding:0;
}
body{
  background-color:black;
  color:white;
}
input{
  width:300px;
  height:20px;
  margin:5px;
  padding:10px;
  border:0;
  border-radius:20px;
  box-sizing: content-box;
}
button{
  width:30px;
  height:30px;
  border:0;
  border-radius:30px;
  cursor: pointer;
  text-align:center;
}
`;

export default GlobalStyle;
