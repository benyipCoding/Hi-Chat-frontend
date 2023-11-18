import { BlurGlassDiv } from '@/utils/styles/BlurGlassDiv';
import PureLogo from '../Logo';
import { motion } from 'framer-motion';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import { useCallback, useRef } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { setPosition, toggle } from '@/store/dropMenuSlice';

const MobileHeader = () => {
  const { isOpen } = useSelector((state: RootState) => state.dropMenu);
  const dispatch = useDispatch<AppDispatch>();
  const button = useRef<HTMLButtonElement>(null);

  const toggleMenu = useCallback(() => {
    dispatch(toggle(!isOpen));
    if (isOpen) return;
    const rect = button.current?.getBoundingClientRect();
    dispatch(setPosition({ x: rect?.x as number, y: rect?.y as number }));
  }, [dispatch, isOpen]);

  return (
    <BlurGlassDiv className="mobile-transition text-white h-12 sm:h-14 flex justify-center items-center shadow-md shadow-[#403637] rounded-md mb-2 lg:hidden relative">
      <PureLogo height={30} extraClass="lg:hidden" />
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
    </BlurGlassDiv>
  );
};

export default MobileHeader;
