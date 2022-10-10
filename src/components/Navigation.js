import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <div>
      <Link to='/'>Main</Link>
      <Link to='profile'>Profile</Link>
    </div>
  );
};

export default Navigation;
