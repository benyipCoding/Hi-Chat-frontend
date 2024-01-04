/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, notification } from 'antd';
import { motion } from 'framer-motion';
import { Input } from '../Inputs';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { setCustomModalVisible, setModalInput } from '@/store/dropMenuSlice';

const CustomModal = () => {
  const { customModalVisible, modalInput } = useSelector(
    (state: RootState) => state.dropMenu
  );

  const dispatch = useDispatch<AppDispatch>();
  const onInput = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch(setModalInput((e.target as HTMLInputElement).value));
  };

  const onConfirm = () => {
    if (!modalInput) {
      notification.error({
        message: 'Please input a group name.',
        duration: 3,
      });
      return;
    }
    console.log('这里进行rename程序');
  };

  return (
    <Modal
      title={
        <p className="relative px-3 text-lg text-slate-800">
          <span className="w-[5px] h-[80%] bg-[#0284c7] absolute left-0 rounded-full top-[50%] translate-y-[-50%]"></span>
          GROUP NAME
        </p>
      }
      open={customModalVisible}
      closeIcon={false}
      footer={
        <>
          <motion.button
            className="text-[#0284c7] py-2 px-3 rounded-md border mr-3 border-[#0284c7]"
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              dispatch(setCustomModalVisible(false));
            }}
          >
            Cancel
          </motion.button>
          <motion.button
            className="bg-[#0284c7] text-white py-2 px-3 rounded-md"
            whileTap={{ scale: 0.9 }}
            onClick={onConfirm}
          >
            Confirm
          </motion.button>
        </>
      }
    >
      <Input
        type="text"
        placeholder="What's the name of this group"
        value={modalInput}
        onInput={(e) => onInput(e)}
      />
    </Modal>
  );
};

export default CustomModal;
