import { BlurGlassDiv } from '@/utils/styles/BlurGlassDiv';
import PureLogo from '../Logo';
import { Outlet } from 'react-router-dom';

const NavigateContent = () => {
  return (
    <BlurGlassDiv className="flex-1 rounded-t-sm overflow-y-auto shadow-md text-white lg:flex-none lg:w-60 xl:w-80 lg:pt-3 lg:flex lg:flex-col">
      <PureLogo height={40} extraClass="hidden lg:flex lg:mb-3" />
      <Outlet />
    </BlurGlassDiv>
  );
};

export default NavigateContent;
