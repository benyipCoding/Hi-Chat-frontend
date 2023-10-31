import { PropsWithChildren, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '@/pages/Login/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home/Home';
import { AuthContext } from './context/AuthContext';
import { User } from './utils/types';

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
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </AppWithProviders>
  );
}

export default App;
