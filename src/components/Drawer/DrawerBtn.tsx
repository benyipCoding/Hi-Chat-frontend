import { AppDispatch, RootState } from '@/store';
import { setPosition, toggle } from '@/store/dropMenuSlice';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const DrawerBtn = () => {
  const { isOpen } = useSelector((state: RootState) => state.dropMenu);
  const button = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const toggleMenu = useCallback(() => {
    dispatch(toggle(!isOpen));
    if (isOpen) return;
    const rect = button.current?.getBoundingClientRect();
    dispatch(setPosition({ x: rect?.x as number, y: rect?.y as number }));
  }, [dispatch, isOpen]);

  return (
    <motion.button
      className={clsx(
        'w-8 h-8 rounded-full absolute right-5 shadow-md shadow-[#111] flex transition-all duration-500',
        !isOpen && 'bg-gradient-to-br from-slate-300 to-slate-500',
        isOpen && 'bg-[#ec9131]'
      )}
      onClick={toggleMenu}
      style={{
        boxShadow: `${isOpen ? '0 0 10px 2px #ec9131' : ''}`,
        filter: `${isOpen ? 'drop-shadow(0 0 12px #ec9131)' : ''}`,
      }}
      ref={button}
    >
      <MenuOutlined
        className={clsx('m-auto text-white text-lg', isOpen && 'hidden')}
      />
      <CloseOutlined
        className={clsx('m-auto text-lg text-white', !isOpen && 'hidden')}
      />
    </motion.button>
  );
};

export default DrawerBtn;
