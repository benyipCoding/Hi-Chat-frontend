import { Outlet } from 'react-router-dom';
import NavigateBar from '@/components/NavigateBar/NavigateBar';
import { BlurGlassDiv } from '@/utils/styles/BlurGlassDiv';
import PureLogo from '@/components/Logo';
import { ThemeProvider } from 'styled-components';
import { CommonTheme } from '@/utils/themes';

const Layout = () => {
  return (
    <ThemeProvider theme={CommonTheme}>
      <div className="w-full h-full flex flex-col p-2 star-bg">
        <BlurGlassDiv className="h-12 flex justify-center items-center shadow-md shadow-[#403637] rounded-md mb-2">
          <PureLogo height={30} />
        </BlurGlassDiv>
        <BlurGlassDiv className="flex-1 rounded-t-sm overflow-y-auto shadow-md text-white">
          <Outlet />
        </BlurGlassDiv>
        <NavigateBar />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
