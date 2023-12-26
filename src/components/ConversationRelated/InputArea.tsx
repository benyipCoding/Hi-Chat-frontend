import { AppDispatch, RootState } from '@/store';
import {
  toggleEmojiPickerVisible,
  updateMessagesBySelf,
} from '@/store/conversationSlice';
import { getConversationList, postCreateMessage } from '@/utils/api';
import { PostMsgData } from '@/utils/types';
import { Space } from 'antd';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import hotkeys from 'hotkeys-js';

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
  const textarea = useRef<HTMLTextAreaElement>(null);

  const { currentConversation } = useSelector(
    (state: RootState) => state.conversation
  );

  const onTextareaKeydown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.altKey) {
      e.preventDefault();
      (e.target as HTMLTextAreaElement).blur();
    }
    if (e.key === 'Enter') {
      sendMsg();
    }
  };

  const sendMsg = () => {
    const content = value.trim();
    if (!content) return toast.error('Can not send empty message!');
    // send msg api
    const data: PostMsgData = {
      content,
      conversationId: currentConversation!.id,
    };
    postCreateMessage(data)
      .then((res) => {
        onChange('');
        dispatch(updateMessagesBySelf(res.data));
        textarea.current?.focus();
      })
      .catch((err) => {
        toast.error(err.data);
      })
      .finally(() => getConversationList());
  };

  // setup hot key
  useEffect(() => {
    hotkeys.unbind('alt+s');
    hotkeys('alt+s', (e) => {
      e.preventDefault();
      sendMsg();
    });

    return () => {
      hotkeys.unbind('alt+s');
    };
  }, [value]);

  return (
    <div
      className={className}
      onClick={() => dispatch(toggleEmojiPickerVisible(false))}
    >
      <Space.Compact className="w-full flex flex-1 gap-2">
        <textarea
          ref={textarea}
          className="form-input flex-1 rounded-md bg-[#0000005e] scroll-bar text-lg"
          value={value}
          onInput={(e) => {
            onChange((e.target as HTMLTextAreaElement).value);
          }}
          onKeyDown={(e) => onTextareaKeydown(e)}
          style={{
            maxHeight: 109,
            minHeight: 50,
          }}
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
