import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Loading3QuartersOutlined } from '@ant-design/icons';

interface ButtonProps {
  label: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  disabled: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, type, disabled }) => {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={clsx(
        'w-[90%] mx-auto rounded-md leading-10 mt-6 shadow-lg text-[#133681] dark:text-white bg-gradient-to-r from-[#fdaa61] via-[#febf71] to-[#b76f50]  md:text-xl font-extrabold text-lg md:h-12',
        !disabled && 'active:shadow-sm',
        disabled &&
          'opacity-70 cursor-wait flex justify-center items-center gap-3'
      )}
    >
      {!disabled && label}
      {disabled && 'Loading...'}
      {disabled && <Loading3QuartersOutlined spin />}
    </motion.button>
  );
};

export default Button;
