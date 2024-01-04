import { AppDispatch, RootState } from '@/store';
import { DropMenuType } from '@/store/dropMenuList';
import {
  setCustomModalVisible,
  setExtraVisible,
  setIsRename,
} from '@/store/dropMenuSlice';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';

const menuList: DropMenuType[] = [
  {
    label: 'Rename',
    icon: <MdDriveFileRenameOutline className="text-[20px]" />,
  },
  {
    label: 'Delete',
    icon: <RiDeleteBin6Line className="text-[20px]" />,
  },
];

const ExtraDropMenu = () => {
  const { extraX, extraY } = useSelector((state: RootState) => state.dropMenu);
  const menu = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const clickOutSideEvent = (event: MouseEvent) => {
    const isClickInside = menu.current?.contains(event.target as HTMLElement);
    if (isClickInside) return;
    dispatch(setExtraVisible(false));
  };

  const onClickExtraMenuItem = (menu: DropMenuType) => {
    dispatch(setCustomModalVisible(true));
    console.log(menu);
    if (menu.label === 'Rename') {
      console.log('这里展示重命名群内容');
      dispatch(setIsRename(true));
    } else {
      console.log('这里展示删除群内容');
      dispatch(setIsRename(false));
    }
  };

  useEffect(() => {
    setTimeout(() => {
      document.addEventListener('click', clickOutSideEvent);
    }, 500);

    return () => {
      document.removeEventListener('click', clickOutSideEvent);
    };
  }, []);

  return (
    <>
      <div
        className="absolute w-[150px] bg-gradient-to-b from-blue-200 to-cyan-200 animate-grow rounded-md p-2 overflow-x-hidden text-blue-900 flex flex-col gap-2 font-[600]"
        style={{ left: `${extraX}px`, top: `${extraY}px` }}
        ref={menu}
      >
        {menuList.map((menu) => (
          <div
            className="flex items-center gap-3 h-6 py-5 px-2 rounded-md cursor-pointer hover:bg-[#00000022] active:bg-[#00000022]"
            onClick={() => onClickExtraMenuItem(menu)}
            key={menu.label}
          >
            {menu.icon}
            {menu.label}
          </div>
        ))}
      </div>
    </>
  );
};

export default ExtraDropMenu;
