import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import React, { useState } from 'react';
import { AiOutlineUserAdd, AiOutlineLogin } from 'react-icons/ai';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
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
    <div>
      <button onClick={onToggle}>
        {newAccount ? <AiOutlineLogin /> : <AiOutlineUserAdd />}
      </button>
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
        <button onSubmit={onSubmit}>Click !</button>
      </form>
    </div>
  );
};

export default Login;
