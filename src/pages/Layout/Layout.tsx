import NavigateBar from '@/components/NavigateBar/NavigateBar';
import { ThemeProvider } from 'styled-components';
import { CommonTheme } from '@/utils/themes';
import MobileHeader from '@/components/Headers/MobileHeader';
import NavigateContent from '@/components/NavigateContent/NavigateContent';
import Conversations from '../Conversations/Conversations';

const Layout = () => {
  return (
    <ThemeProvider theme={CommonTheme}>
      <div className="relative w-full h-full flex flex-col p-2 star-bg lg:flex-row-reverse lg:justify-end lg:gap-2 overflow-x-hidden">
        {/* conversation */}
        <Conversations />
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
