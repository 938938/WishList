import { useEffect, useState } from 'react';
import { authService } from '../fbase';
import GlobalStyle from '../global/GlobalStyle';
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
      <div>{init ? <Router isLogin={isLogin} userObj={userObj} /> : 'Loading...'}</div>
    </>
  );
}

export default App;
