import NavigateBar from '@/components/NavigateBar/NavigateBar';
import { ThemeProvider } from 'styled-components';
import { CommonTheme } from '@/utils/themes';
import MobileHeader from '@/components/Headers/MobileHeader';
import NavigateContent from '@/components/NavigateContent/NavigateContent';
import Conversations from '../Conversations/Conversations';
import { CommonContext } from '@/context/CommonContext';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '@/context/SocketContext';

const Layout = () => {
  const [transitiondivList, setTransitionDivList] =
    useState<NodeListOf<HTMLDivElement>>();
  const socket = useContext(SocketContext);

  useEffect(() => {
    const divList = document.querySelectorAll<HTMLDivElement>('#root>div>div');
    setTransitionDivList(divList);
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <ThemeProvider theme={CommonTheme}>
      <CommonContext.Provider value={transitiondivList}>
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
      </CommonContext.Provider>
    </ThemeProvider>
  );
};

export default Layout;
