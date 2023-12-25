import ConversationScreen from '@/components/ConversationRelated/ConversationScreen';
import ToolBar from '@/components/ConversationRelated/ToolBar';
import InputArea from '@/components/ConversationRelated/InputArea';
import EmojiPicker from '@/components/EmojiPicker';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import {
  fetchMessagesThunk,
  toggleEmojiPickerVisible,
} from '@/store/conversationSlice';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const Conversations = () => {
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const { messages } = useSelector((state: RootState) => state.conversation);
  const [inputValue, setInputValue] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [recording, setRecording] = useState<boolean>(false);

  const { currentConversation } = useSelector(
    (state: RootState) => state.conversation
  );

  const dispatch = useDispatch<AppDispatch>();
  const { isShowEmojiPicker } = useSelector(
    (state: RootState) => state.conversation
  );

  const onClickEmoji = (posX: number, posY: number) => {
    setX(posX);
    setY(posY - 5);
    dispatch(toggleEmojiPickerVisible(!isShowEmojiPicker));
  };

  const onEmojiSelect = (emo: string) => {
    setInputValue((prev) => (prev += emo));
  };

  const voiceToText = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      setModalVisible(true);
    } else {
      toast.error('Your browser version does not support speech recognition');
    }
  };

  useEffect(() => {
    if (!currentConversation) return;
    dispatch(fetchMessagesThunk(currentConversation.id));
  }, [currentConversation?.id]);

  return (
    <>
      {currentConversation && (
        <ConversationScreen
          className="rounded-md bg-[#0000005e] h-[75%] lg:h-[70%] p-2 pt-4 md:p-4 lg:p-6 overflow-y-auto flex flex-col relative gap-4 md:gap-6"
          messages={messages}
        />
      )}
      {currentConversation && (
        <ToolBar
          className="rounded-md bg-[#0000005e] h-[6%] px-6 flex items-center text-2xl gap-6 flex-row-reverse"
          onClickEmoji={onClickEmoji}
          onClickMicrophone={voiceToText}
          modalVisible={modalVisible}
        />
      )}
      {currentConversation && (
        <InputArea
          className="rounded-md bg-[#0000005e] flex-1  p-2 flex flex-col gap-3"
          value={inputValue}
          onChange={setInputValue}
        />
      )}
      <EmojiPicker
        className={clsx(
          'absolute opacity-0 pointer-events-none transition scale-0',
          isShowEmojiPicker && 'opacity-100 pointer-events-auto scale-100'
        )}
        style={{ right: `${x}px`, top: `${y}px` }}
        onEmojiSelect={onEmojiSelect}
      />

      <Modal
        title={
          <p className="relative px-3 text-lg text-slate-800">
            <span className="w-[5px] h-[80%] bg-[#0284c7] absolute left-0 rounded-full top-[50%] translate-y-[-50%]"></span>
            Voice to Text
          </p>
        }
        open={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
        footer={<></>}
        centered
        width={350}
      >
        <div className="flex flex-col justify-center items-center py-6 relative">
          <svg
            viewBox="0 0 1024 1024"
            version="1.1"
            p-id="2866"
            width="80"
            height="80"
            className="z-1"
          >
            <path
              className="path"
              d="M486.4 972.8v-128.9728A332.8 332.8 0 0 1 179.2 512a25.6 25.6 0 0 1 51.2 0 281.6 281.6 0 0 0 563.2 0 25.6 25.6 0 1 1 51.2 0 332.8 332.8 0 0 1-307.2 331.8272V972.8h153.6a25.6 25.6 0 1 1 0 51.2h-358.4a25.6 25.6 0 1 1 0-51.2h153.6zM512 51.2a153.6 153.6 0 0 0-153.6 153.6v307.2a153.6 153.6 0 0 0 307.2 0V204.8a153.6 153.6 0 0 0-153.6-153.6z m0-51.2a204.8 204.8 0 0 1 204.8 204.8v307.2a204.8 204.8 0 1 1-409.6 0V204.8a204.8 204.8 0 0 1 204.8-204.8z"
              fill="#515151"
              p-id="2867"
            ></path>
          </svg>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className={clsx(
              'w-full bg-gradient-to-tr from-lime-400 to-lime-500 rounded-md flex justify-center items-center py-1 mt-10 text-2xl',
              recording && 'bg-gradient-to-br from-rose-500 to-yellow-500'
            )}
            onClick={() => setRecording((prev) => !prev)}
          >
            {recording ? 'Stop' : 'Start record'}
          </motion.button>
          <div className="w-[20px] h-[45px] overflow-hidden absolute left-[50%] top-[30px] z-0 rounded-[10px] translate-x-[-50%]">
            {recording && (
              <div
                className="w-full h-full bg-gradient-to-tr from-lime-400 to-lime-500 transition rounded-[10px]"
                style={{ transform: `translateY(50%)` }}
              ></div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Conversations;
