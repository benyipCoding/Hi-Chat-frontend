import { PropsWithChildren, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '@/pages/Login/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './pages/Layout/Layout';
import { AuthContext } from './context/AuthContext';
import { User } from './utils/types';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import NotFound from './pages/NotFound';
import MessagePage from './pages/MessagePage/MessagePage';
import ContactPage from './pages/ContactPage/ContactPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import { store } from '@/store';
import { Provider as ReduxProvider } from 'react-redux';
import { SocketContext, socket } from '@/context/SocketContext';
import { Socket } from 'socket.io-client';
import Test from './pages/Test/Test';
import { ConfigProvider } from 'antd';
import { theme } from '@/utils/themes/antdCustomTheme';
import GroupChat from './pages/GroupChat/GroupChat';

type AppWithProvidersProps = {
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  socket: Socket;
};

const AppWithProviders: React.FC<PropsWithChildren & AppWithProvidersProps> = ({
  children,
  user,
  setUser,
  socket,
}) => {
  return (
    <ReduxProvider store={store}>
      <SocketContext.Provider value={socket}>
        <AuthContext.Provider value={{ user, updateAuthUser: setUser }}>
          <ConfigProvider theme={theme}>{children}</ConfigProvider>
        </AuthContext.Provider>
      </SocketContext.Provider>
    </ReduxProvider>
  );
};

function App() {
  const [user, setUser] = useState<User>();

  return (
    <AppWithProviders user={user} setUser={setUser} socket={socket}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route element={<AuthenticatedRoute children={<Layout />} />}>
          <Route path="messages" element={<MessagePage />}></Route>
          <Route path="contacts" element={<ContactPage />} />
          <Route path="groupchat" element={<GroupChat />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="/test" element={<Test />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
    </AppWithProviders>
  );
}

export default App;
