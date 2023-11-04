import { PropsWithChildren, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '@/pages/Login/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './pages/Layout/Layout';
import { AuthContext } from './context/AuthContext';
import { User } from './utils/types';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import Conversations from './pages/Conversations/Conversations';
import NotFound from './pages/NotFound';
import MessagePage from './pages/MessagePage/MessagePage';
import ContactPage from './pages/ContactPage/ContactPage';
import DiscoveryPage from './pages/DiscoveryPage/DiscoveryPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';

type AppWithProvidersProps = {
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

const AppWithProviders: React.FC<PropsWithChildren & AppWithProvidersProps> = ({
  children,
  user,
  setUser,
}) => {
  return (
    <AuthContext.Provider value={{ user, updateAuthUser: setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

function App() {
  const [user, setUser] = useState<User>();

  return (
    <AppWithProviders user={user} setUser={setUser}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route element={<AuthenticatedRoute children={<Layout />} />}>
          <Route path="messages" element={<MessagePage />} />
          <Route path="contacts" element={<ContactPage />} />
          <Route path="discovery" element={<DiscoveryPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="conversations" element={<Conversations />} />
        </Route>
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
