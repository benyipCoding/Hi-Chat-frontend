import { AppDispatch, RootState } from '@/store';
import { DropMenuType } from '@/store/dropMenuList';
import { toggle } from '@/store/dropMenuSlice';
import { slideIn, zoomIn } from '@/utils/motion';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function useAnimate(isOpen: boolean, menu: React.RefObject<HTMLUListElement>) {
  const { menuButtonX, menuButtonY } = useSelector(
    (state: RootState) => state.dropMenu
  );
  useEffect(() => {
    if (!isOpen || !menu.current) return;
    menu.current.style.right = `${window.innerWidth - menuButtonX - 40}px`;
    menu.current.style.top = `${menuButtonY + 45}px`;
  }, [isOpen]);
}

function useClickOutSideEvent(
  menu: React.RefObject<HTMLUListElement>,
  dispatch: AppDispatch
) {
  const clickOutSideEvent = (event: MouseEvent) => {
    const isClickInside = menu.current?.contains(event.target as HTMLElement);
    if (isClickInside) return;
    dispatch(toggle(false));
  };

  useEffect(() => {
    setTimeout(() => {
      document.body.addEventListener('click', clickOutSideEvent);
    }, 100);
    return () => {
      document.body.removeEventListener('click', clickOutSideEvent);
    };
  }, []);
}

const DropMenu = () => {
  const menu = useRef<HTMLUListElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen, dropMenuList } = useSelector(
    (state: RootState) => state.dropMenu
  );

  useAnimate(isOpen, menu);
  useClickOutSideEvent(menu, dispatch);

  const clickMenuItem = async (menu: DropMenuType) => {
    menu.onClick(dispatch);
    dispatch(toggle(false));
  };

  return (
    <motion.ul
      variants={zoomIn(0, 0.2)}
      initial="hidden"
      whileInView="show"
      className={`bg-gradient-to-b from-blue-200 to-cyan-200 absolute w-[160px] sm:w-[250px] rounded-md p-2 sm:p-3 overflow-x-hidden text-blue-900 flex flex-col gap-2 sm:gap-3 font-[600] sm:text-[20px]`}
      ref={menu}
    >
      {dropMenuList.map((menu, index) => (
        <motion.li
          variants={slideIn('left', 'tween', 0.3, 0.05 * index)}
          initial="hidden"
          whileInView="show"
          className="flex items-center gap-3 h-6 py-5 px-2 rounded-md cursor-pointer hover:bg-[#00000022] active:bg-[#00000022]"
          key={index}
          onClick={() => clickMenuItem(menu)}
        >
          {menu.icon}
          {menu.label}
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default DropMenu;
