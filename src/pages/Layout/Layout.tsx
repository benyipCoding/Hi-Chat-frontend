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
    <div className="w-full h-full bg-slate-200 flex flex-col">
      <div className="bg-blue-300 h-20">
        title
        <button className="border rounded-sm" onClick={logout}>
          logout
        </button>
      </div>
      <div className="bg-pink-300 flex-1">body</div>
      <div className="bg-green-400 h-16">footer</div>
    </div>
  );
};

export default Layout;
