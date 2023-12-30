import { BlurGlassDiv } from '@/utils/styles/BlurGlassDiv';
import { motion } from 'framer-motion';

interface DrawerConfirmBtnProps {
  label: string;
  onClick: () => void;
}

const DrawerConfirmBtn: React.FC<DrawerConfirmBtnProps> = ({
  label,
  onClick,
}) => {
  return (
    <BlurGlassDiv className="h-14 absolute bottom-0 w-[100%] flex justify-center items-center">
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="bg-[#0284c7] h-[70%] w-[80%] flex items-center justify-center rounded-full text-white text-[20px]"
        onClick={onClick}
      >
        {label}
      </motion.button>
    </BlurGlassDiv>
  );
};

export default DrawerConfirmBtn;
