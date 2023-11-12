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
import DiscoveryPage from './pages/DiscoveryPage/DiscoveryPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import { store } from '@/store';
import { Provider as ReduxProvider } from 'react-redux';
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
    <ReduxProvider store={store}>
      <AuthContext.Provider value={{ user, updateAuthUser: setUser }}>
        {children}
      </AuthContext.Provider>
    </ReduxProvider>
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
          <Route path="messages" element={<MessagePage />}></Route>
          <Route path="contacts" element={<ContactPage />} />
          <Route path="discovery" element={<DiscoveryPage />} />
          <Route path="profile" element={<ProfilePage />} />
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
