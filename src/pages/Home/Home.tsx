// import React from 'react';
import { PropsWithChildren } from 'react';

const Home: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-pink-300">
      home
      <div>{children}</div>
    </div>
  );
};

export default Home;
