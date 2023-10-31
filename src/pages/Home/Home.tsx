// import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

const Home = () => {
  const { user, updateAuthUser } = useContext(AuthContext);

  return (
    <div className="bg-pink-300 w-full h-full flex">
      <span className="m-auto">Home</span>
    </div>
  );
};

export default Home;
