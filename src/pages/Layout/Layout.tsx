import NavigateBar from '@/components/NavigateBar/NavigateBar';
import { ThemeProvider } from 'styled-components';
import { CommonTheme } from '@/utils/themes';
import MobileHeader from '@/components/Headers/MobileHeader';
import NavigateContent from '@/components/NavigateContent/NavigateContent';
import { BlurGlassDiv } from '@/utils/styles/BlurGlassDiv';

const Layout = () => {
  return (
    <ThemeProvider theme={CommonTheme}>
      <div className="relative w-full h-full flex flex-col p-2 star-bg lg:flex-row-reverse lg:justify-end lg:gap-2 overflow-x-hidden">
        {/* conversation */}
        <div className="absolute left-[100%] top-2 h-[98%] lg:h-full lg:static flex lg:flex-1 flex-col gap-2 text-white">
          <BlurGlassDiv className="text-xl p-2 h-16 lg:h-20 rounded-md lg:flex-shrink-0 flex items-center lg:text-3xl lg:p-4">
            Conversation Title
          </BlurGlassDiv>
          <BlurGlassDiv className="h-full rounded-md p-2">123</BlurGlassDiv>
        </div>

        {/* Header */}
        <MobileHeader />
        {/* Body */}
        <NavigateContent />
        {/* Footer */}
        <NavigateBar />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
