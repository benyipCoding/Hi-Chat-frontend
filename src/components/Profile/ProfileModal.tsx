import { AppDispatch, RootState } from '@/store';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { toggleProfileModalVisible } from '@/store/profileSlice';

const ProfileModal = () => {
  const { profileModalVisible, modalTitle } = useSelector(
    (state: RootState) => state.profile
  );
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Modal
      title={
        <p className="relative px-3 text-lg text-slate-800">
          <span className="w-[5px] h-[80%] absolute left-0 rounded-full top-[50%] translate-y-[-50%] bg-[#0284c7]"></span>
          {modalTitle}
        </p>
      }
      open={profileModalVisible}
      closeIcon={false}
      footer={
        <>
          <motion.button
            className="text-[#0284c7] py-2 px-3 rounded-md border mr-3 border-[#0284c7]"
            whileTap={{ scale: 0.9 }}
            onClick={() => dispatch(toggleProfileModalVisible(false))}
          >
            Cancel
          </motion.button>
          <motion.button
            className="bg-[#0284c7] text-white py-2 px-3 rounded-md"
            whileTap={{ scale: 0.9 }}
            onClick={() => dispatch(toggleProfileModalVisible(false))}
          >
            Confirm
          </motion.button>
        </>
      }
    >
      <div>123</div>
    </Modal>
  );
};

export default ProfileModal;
