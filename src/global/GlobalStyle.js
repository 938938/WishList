import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
  margin:0;
  padding:0;
}
body{
  background-color:#346273;
  color:#13394D;
}
input{
  width:300px;
  height:20px;
  margin:5px;
  padding:10px;
  border:0;
  border-radius:10px;
  box-sizing: content-box;
}
button{
  width: 15px;
  height: 15px;
  border-radius: 0;
  margin: 5px 0;
  border:0;
  cursor: pointer;
  text-align:center;
}
`;

export default GlobalStyle;
