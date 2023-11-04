import { Outlet } from 'react-router-dom';
import NavigateBar from '@/components/NavigateBar/NavigateBar';
import { BlurGlassDiv } from '@/utils/styles/BlurGlassDiv';
import PureLogo from '@/components/Logo';
import { ThemeProvider } from 'styled-components';
import { CommonTheme } from '@/utils/themes';

const Layout = () => {
  return (
    <ThemeProvider theme={CommonTheme}>
      <div className="w-full h-full flex flex-col p-2 star-bg lg:flex-row-reverse lg:justify-end lg:gap-2">
        {/* Head */}
        <BlurGlassDiv className="text-white h-12 flex justify-center items-center shadow-md shadow-[#403637] rounded-md mb-2 lg:hidden">
          <PureLogo height={30} extraClass="lg:hidden" />
        </BlurGlassDiv>
        {/* Body */}
        <BlurGlassDiv className="flex-1 rounded-t-sm overflow-y-auto shadow-md text-white lg:flex-none lg:w-60 xl:w-80 lg:pt-3 lg:flex lg:flex-col">
          <PureLogo height={40} extraClass="hidden lg:flex lg:mb-3" />
          <Outlet />
        </BlurGlassDiv>
        {/* Footer */}
        <NavigateBar />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
