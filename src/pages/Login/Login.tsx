import './Login.scss';
import { motion } from 'framer-motion';
import { popIn } from '@/utils/motion';
import { AuthForm } from '@/components/Forms';
import PureLogo from '@/components/Logo';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';

const Login: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate('/conversations', { replace: true });
  }, [user]);

  return (
    <div className="login-bg w-full h-full bg-cover bg-center flex">
      <motion.div
        className="w-[320px] md:w-[450px] m-auto rounded-xl backdrop-blur-[10px] bg-opacity-20 bg-[#f4f8fa] flex flex-col overflow-hidden shadow-sm shadow-black py-10 gap-5 md:gap-10"
        variants={popIn()}
        initial="hidden"
        whileInView="show"
      >
        {/* logo */}
        <PureLogo />

        {/* AuthForm */}
        <AuthForm />
      </motion.div>
    </div>
  );
};

export default Login;
