import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import React, { useState } from 'react';
import styled from 'styled-components';
import { IoIosInformationCircleOutline } from 'react-icons/io';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formError, setFormError] = useState('');
  const onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === 'email') {
      const emailRegex =
        /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
      if (!emailRegex.test(value)) {
        setErrorMsg('올바른 이메일 형식을 사용해주세요');
      } else {
        setErrorMsg('');
      }
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const auth = getAuth();
      if (newAccount) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      if (newAccount) {
        setFormError('이메일 형식이 잘못되었습니다.');
      } else {
        setFormError('이메일 혹은 비밀번호가 잘못 되었습니다.');
      }
    }
  };

  const onGuest = async (event) => {
    event.preventDefault();
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, 'abc@def.com', '123123');
    } catch {
      console.error();
    }
  };

  const onToggle = () => {
    setNewAccount((prev) => !prev);
  };
  return (
    <LogInDiv>
      <LoginTitle>For your wish list</LoginTitle>
      <form onSubmit={onSubmit}>
        <ErrorMessage>{errorMsg}</ErrorMessage>
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
        <ErrorMessage>{formError}</ErrorMessage>
        <LoginButton onSubmit={onSubmit}>
          {newAccount ? '회원가입' : '시작하기'}
        </LoginButton>
        {!newAccount && (
          <>
            <GuestButton onClick={onGuest} id='guest'>
              게스트 로그인 <IoIosInformationCircleOutline />
            </GuestButton>
            <GuestLabel htmlFor='guest'>
              테스트 계정인 'abc@def.com'으로 로그인하게 됩니다.
            </GuestLabel>
          </>
        )}
      </form>
    </LogInDiv>
  );
};

export default Login;

const LoginTitle = styled.h3`
  margin: 20px;
`;
const ErrorMessage = styled.p`
  height: 15px;
  font-size: 13px;
  margin-left: 20px;
  color: red;
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
  @media screen and (max-width: 460px) {
    width: 80vw;
  }
`;

const GuestButton = styled(LoginButton)`
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    text-decoration: underline;
    background-color: transparent;
    color: gray;
  }
  &:hover + label {
    display: block;
  }
  svg {
    margin-left: 5px;
  }
`;

const GuestLabel = styled.label`
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  text-align: center;
  width: 20vw;
  display: none;
  font-size: 13px;
`;
