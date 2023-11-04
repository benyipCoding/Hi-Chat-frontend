import { Outlet } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';
import { delLocalStorage } from '@/utils/helpers';
import { useContext, useMemo } from 'react';
import NavigateBar from '@/components/NavigateBar/NavigateBar';
import clsx from 'clsx';

const Layout = () => {
  const { updateAuthUser } = useContext(AuthContext);

  const topBarHeight = useMemo(() => 20, []);
  const bottomBarHeight = useMemo(() => 16, []);

  const logout = () => {
    delLocalStorage();
    updateAuthUser(null);
  };
  return (
    <div className="w-full h-full">
      <div className={clsx(`blur-glass h-20 w-full fixed top-0`)}>title</div>
      <div
        className={clsx(
          `h-full bg-[#313338] pt-${topBarHeight} overflow-y-auto`
        )}
      >
        <Outlet />
        <div className="h-16 md:hidden"></div>
      </div>
      {/* <div className="bg-green-200 pt-20 h-full">123</div> */}
      <NavigateBar />
    </div>
  );
};

export default Layout;
