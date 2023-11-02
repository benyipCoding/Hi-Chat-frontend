// import { Outlet } from 'react-router-dom';

import { AuthContext } from '@/context/AuthContext';
import { delLocalStorage } from '@/utils/helpers';
import { useContext } from 'react';

const Layout = () => {
  const { updateAuthUser } = useContext(AuthContext);

  const logout = () => {
    delLocalStorage();
    updateAuthUser(null);
  };
  return (
    <div className="bg-pink-300">
      Layout
      <button className="bg-blue-300" onClick={logout}>
        logout
      </button>
    </div>
  );
};

export default Layout;
