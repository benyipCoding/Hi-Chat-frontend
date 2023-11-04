import { ClassValue } from 'clsx';
import React from 'react';

interface LogoProps {
  height?: number;
  extraClass?: ClassValue;
}

const Logo: React.FC<LogoProps> = ({ height = undefined, extraClass = '' }) => {
  return (
    <div
      className={`h-[50px] md:h-[60px] flex justify-center items-center ${extraClass}`}
      style={{ height }}
    >
      <img src="/images/login/hi-chat.png" alt="" className="h-full" />
    </div>
  );
};

const PureLogo = React.memo(Logo);

export default PureLogo;
