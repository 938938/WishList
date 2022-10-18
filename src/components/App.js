import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { authService } from '../fbase';
import GlobalStyle from '../GlobalStyle';
import Router from './Router';

function App() {
  const [init, setInit] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(true);
        setUserObj(user);
      } else {
        setIsLogin(false);
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      <GlobalStyle />
      <AppDiv>
        {init ? <Router isLogin={isLogin} userObj={userObj} /> : 'Loading...'}
      </AppDiv>
    </>
  );
}

export default App;

const AppDiv = styled.div`
  margin: 10px auto;
  padding: 10px;
  width: 80vw;
  max-width: 600px;
  min-width: 320px;
  border: 1px solid white;
`;
