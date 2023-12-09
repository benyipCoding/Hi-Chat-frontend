import { AppDispatch } from '@/store';
import { toggleEmojiPickerVisible } from '@/store/conversationSlice';
import { Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { motion } from 'framer-motion';
import { RiSendPlaneFill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';

interface InputAreaProps {
  className: string;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

const InputArea: React.FC<InputAreaProps> = ({
  className,
  value,
  onChange,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const sendMsg = () => {
    console.log(value);
    // send msg api
  };

  return (
    <div
      className={className}
      onClick={() => dispatch(toggleEmojiPickerVisible(false))}
    >
      <Space.Compact className="w-full flex flex-1 gap-2">
        <TextArea
          style={{
            backgroundColor: '#0000005e',
            borderColor: 'transparent',
            flex: 1,
            boxSizing: 'border-box',
          }}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-md text-md w-14 flex justify-center items-center flex-col gap-1"
          onClick={sendMsg}
        >
          <RiSendPlaneFill className="text-2xl" />
          SEND
        </motion.button>
      </Space.Compact>
    </div>
  );
};

export default InputArea;
