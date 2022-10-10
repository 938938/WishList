import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onChange = () => {}
  return (
    <div>
      <form>
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
        <button></button>
      </form>
      {/* <button onClick={onSocialClick}>Google</button> */}
    </div>
  );
};

export default Login;
