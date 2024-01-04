import { AppDispatch, RootState } from '@/store';
import {
  toggleEmojiPickerVisible,
  updateMessagesBySelf,
} from '@/store/conversationSlice';
import {
  getConversationList,
  postCreateGroupMessage,
  postCreateMessage,
} from '@/utils/api';
import { PostMsgData } from '@/utils/types';
import { Space } from 'antd';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import hotkeys from 'hotkeys-js';
import { FaBackspace } from 'react-icons/fa';
import { fetchGroupConvList } from '@/store/groupConversationSlice';

interface InputAreaProps {
  className: string;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  onClear: () => void;
}

const InputArea: React.FC<InputAreaProps> = ({
  className,
  value,
  onChange,
  onClear,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const textarea = useRef<HTMLTextAreaElement>(null);
  const { isGroup } = useSelector((state: RootState) => state.conversation);
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
    const data: PostMsgData = {
      content,
      conversationId: currentConversation!.id,
    };
    // send msg api
    if (isGroup) {
      postCreateGroupMessage(data)
        .then((res) => {
          console.log(res.data);
          onChange('');
          dispatch(updateMessagesBySelf(res.data));
          textarea.current?.focus();
          dispatch(fetchGroupConvList());
        })
        .catch((err) => {
          toast.error(err.data);
        });
    } else {
      postCreateMessage(data)
        .then((res) => {
          onChange('');
          dispatch(updateMessagesBySelf(res.data));
          textarea.current?.focus();
          getConversationList();
        })
        .catch((err) => {
          toast.error(err.data);
        });
    }
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
      <Space.Compact className="w-full flex flex-1 gap-2 lg:flex-col lg:items-end justify-between">
        <textarea
          ref={textarea}
          className="form-input flex-1 rounded-md bg-[#0000005e] scroll-bar text-lg max-h-[17.6vh] lg:w-full lg:max-h-[13vh] min-h-[50px]"
          value={value}
          onInput={(e) => {
            onChange((e.target as HTMLTextAreaElement).value);
          }}
          onKeyDown={(e) => onTextareaKeydown(e)}
          rows={1}
        />
        <div className="flex ">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="bg-gradient-to-br from-rose-500 to-orange-500 rounded-md text-md w-14 md:w-16 flex justify-center items-center flex-col gap-1 lg:w-24 py-[0.6vh] lg:flex-row mr-4 max-lg:hidden"
            onClick={onClear}
          >
            <FaBackspace className="text-xl" />
            CLEAR
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="bg-gradient-to-t from-lime-500 to-green-500 rounded-md text-md w-14 sm:w-16 flex justify-center items-center flex-col gap-1 lg:w-24 py-[0.6vh] lg:flex-row"
            onClick={sendMsg}
          >
            <RiSendPlaneFill className="text-2xl" />
            SEND
          </motion.button>
        </div>
      </Space.Compact>
    </div>
  );
};

export default InputArea;
