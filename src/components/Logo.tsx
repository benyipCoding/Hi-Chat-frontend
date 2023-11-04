import React from 'react';

interface LogoProps {
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ height = undefined }) => {
  return (
    <div
      className={`h-[50px] md:h-[60px] flex justify-center items-center`}
      style={{ height }}
    >
      <img src="/images/login/hi-chat.png" alt="" className="h-full" />
    </div>
  );
};

const PureLogo = React.memo(Logo);

export default PureLogo;
