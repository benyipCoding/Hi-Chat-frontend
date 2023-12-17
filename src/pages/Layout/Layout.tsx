import NavigateBar from '@/components/NavigateBar/NavigateBar';
import { ThemeProvider } from 'styled-components';
import { CommonTheme } from '@/utils/themes';
import MobileHeader from '@/components/Headers/MobileHeader';
import NavigateContent from '@/components/NavigateContent/NavigateContent';
import { CommonContext } from '@/context/CommonContext';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '@/context/SocketContext';
import DropMenu from '@/components/DropMenu/DropMenu';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import Drawer from '@/components/Drawer/Drawer';
import DynamicPage from '@/components/DynamicPage/DynamicPage';
// import { fetchConversationsThunk } from '@/store/conversationSlice';
import { fetchFriendsThunk, fetchInvitationsThunk } from '@/store/friendsSlice';
import { getConversationList } from '@/utils/api';

const Layout = () => {
  const [transitiondivList, setTransitionDivList] =
    useState<NodeListOf<HTMLDivElement>>();
  const socket = useContext(SocketContext);
  const { isOpen } = useSelector((state: RootState) => state.dropMenu);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const divList = document.querySelectorAll<HTMLDivElement>('#root>div>div');
    setTransitionDivList(divList);
    socket.connect();
    // dispatch(fetchConversationsThunk());
    getConversationList();
    dispatch(fetchInvitationsThunk());
    dispatch(fetchFriendsThunk());

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <ThemeProvider theme={CommonTheme}>
      <CommonContext.Provider value={transitiondivList}>
        <div className="relative w-full h-full flex flex-col p-2 star-bg lg:flex-row-reverse lg:justify-end lg:gap-2 overflow-x-hidden">
          {/* DynamicPage */}
          <DynamicPage />
          {/* Header */}
          <MobileHeader />
          {/* Body */}
          <NavigateContent />
          {/* Mobile Footer | Side bar navigation */}
          <NavigateBar />
          {/* DropMenu */}
          {isOpen && <DropMenu />}
          {/* Dialog or Drawer */}
          <Drawer />
        </div>
      </CommonContext.Provider>
    </ThemeProvider>
  );
};

export default Layout;
