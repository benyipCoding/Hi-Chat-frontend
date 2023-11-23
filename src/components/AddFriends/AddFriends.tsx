import { LineWithText } from '@/utils/styles/LineWithText';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Input } from '../Inputs';
import { motion } from 'framer-motion';
import { BlurGlassDiv } from '@/utils/styles/BlurGlassDiv';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';

import UserList from '../List/UserList';
import { useContext, useEffect, useMemo, useState } from 'react';
import { allOrNone } from '@/store/friendsSlice';
import { Modal } from 'antd';
import { AuthContext } from '@/context/AuthContext';
import { postFriendInvitation } from '@/utils/api';
import { toast } from 'react-toastify';

const AddFriends = () => {
  const { user } = useContext(AuthContext);
  const { visible } = useSelector((state: RootState) => state.drawer);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [inputVal, setInputVal] = useState<string>('');
  const [helloText, setHelloText] = useState<string>(
    `Hi,I'm ${user?.name}. Nice to meet you!`
  );

  const { strangers } = useSelector((state: RootState) => state.friends);
  const isShowBtn = useMemo<boolean>(
    () => strangers.filter((s) => s.checked).length !== 0,
    [strangers]
  );
  const dispatch = useDispatch<AppDispatch>();

  const selectAllOrNone = () => {
    dispatch(allOrNone());
  };
  useEffect(() => {
    if (visible) return;
    setInputVal('');
  }, [visible]);

  const onConfirm = async () => {
    console.log(strangers);
    console.log(helloText);
    const userIds = strangers.filter((u) => u.checked).map((u) => u.id);

    postFriendInvitation({ userIds, helloText })
      .then(() => toast.success('Invitations sent'))
      .catch((err) => toast.error(err))
      .finally(() => setIsModalOpen(false));
  };

  return (
    <div className="h-full flex flex-col relative">
      {/* search input */}
      <div className="h-[2.25rem] flex items-center w-full gap-2">
        <Input
          placeholder="Please input user name."
          type="text"
          onInput={(e) => setInputVal((e.target as HTMLInputElement).value)}
          value={inputVal}
        />
        <CheckCircleOutlined
          className="w-16 h-full bg-sky-600 flex justify-center items-center text-white rounded-md text-[1.25rem] cursor-pointer"
          onClick={selectAllOrNone}
        />
      </div>

      <LineWithText className="mt-10 h-[.125rem] relative" color="red">
        <p className="absolute bottom-[-0.625rem] left-[50%] translate-x-[-50%] text-black w-[18.75rem] text-center text-[1rem]">
          You may be interested
        </p>
      </LineWithText>

      {visible && <UserList filter={inputVal} />}

      {isShowBtn && (
        <BlurGlassDiv className="h-14 absolute bottom-0 w-[100%] flex justify-center items-center">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="bg-[#0284c7] h-[70%] w-[80%] flex items-center justify-center rounded-full text-white text-[20px]"
            onClick={() => setIsModalOpen(true)}
          >
            Send invitation
          </motion.button>
        </BlurGlassDiv>
      )}

      <Modal
        title={
          <p className="relative px-3 text-lg">
            <span className="w-[5px] h-[80%] bg-[#0284c7] absolute left-0 rounded-full top-[50%] translate-y-[-50%]"></span>
            SEND GREETINGS
          </p>
        }
        open={isModalOpen}
        closeIcon={false}
        footer={
          <>
            <motion.button
              className="text-[#0284c7] py-2 px-3 rounded-md border mr-3 border-[#0284c7]"
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsModalOpen(false)}
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
          placeholder="Say hello to your friends?"
          value={helloText}
          onInput={(e) => setHelloText((e.target as HTMLInputElement).value)}
        />
      </Modal>
    </div>
  );
};

export default AddFriends;
