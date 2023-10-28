import React from 'react';

const Logo = () => {
  return (
    <div className="h-[50px] md:h-[60px] flex justify-center items-center">
      <img src="/images/login/hi-chat.png" alt="" className="h-full" />
    </div>
  );
};

const PureLogo = React.memo(Logo);

export default PureLogo;
