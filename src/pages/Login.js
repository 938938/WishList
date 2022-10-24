import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import React, { useState } from 'react';
import styled from 'styled-components';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(false);
  const onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      const auth = getAuth();
      if (newAccount) {
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        data = await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onToggle = () => {
    setNewAccount((prev) => !prev);
  };
  return (
    <LogInDiv>
      <LoginTitle>For your wish list</LoginTitle>
      <form onSubmit={onSubmit}>
        <input
          name='email'
          type='text'
          placeholder='Email'
          required
          value={email}
          onChange={onChange}
        />
        <input
          name='password'
          type='password'
          placeholder='Password'
          required
          valeu={password}
          onChange={onChange}
        />
        <Toggle onClick={onToggle}>
          {newAccount ? 'Sign In' : 'Create Account'}
        </Toggle>
        <LoginButton onSubmit={onSubmit}>
          {newAccount ? '회원가입' : '시작하기'}
        </LoginButton>
      </form>
    </LogInDiv>
  );
};

export default Login;
const LoginTitle = styled.h3`
  margin: 20px;
`;
const LogInDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
  width: 320px;
  margin: 0 auto;
`;

const Toggle = styled.p`
  width: 20vw;
  text-align: center;
  margin: 5px auto;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const LoginButton = styled.button`
  width: 20vw;
  height: 20px;
  margin: 10px 5px;
  padding: 10px;
  border: 0;
  border-radius: 20px;
  box-sizing: content-box;
  &:hover {
    background-color: gray;
    color: white;
  }
`;
