import { LineWithText } from '@/utils/styles/LineWithText';
import { Input } from '../Inputs';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import UserList from '../List/UserList';
import { useContext, useEffect, useMemo, useState } from 'react';
import { allOrNone, fetchInvitationsThunk } from '@/store/friendsSlice';
import { Modal } from 'antd';
import { AuthContext } from '@/context/AuthContext';
import { postFriendInvitation } from '@/utils/api';
import { toast } from 'react-toastify';
import { toggleVisible } from '@/store/drawerSlice';
import SearchInput from '../Inputs/SearchInput';
import DrawerConfirmBtn from '../Buttons/DrawerConfirmBtn';

const AddFriends = () => {
  const { user } = useContext(AuthContext);
  const { visible } = useSelector((state: RootState) => state.drawer);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [inputVal, setInputVal] = useState<string>('');
  const [greetings, setGreetings] = useState<string>(
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
    const userIds = strangers.filter((u) => u.checked).map((u) => u.id);

    postFriendInvitation({ userIds, greetings })
      .then((res) => {
        console.log(res);
        toast.success(`${res.data} Invitations sent`);
      })
      .catch((err) => toast.error(err))
      .finally(() => {
        setIsModalOpen(false);
        dispatch(toggleVisible(false));
        dispatch(fetchInvitationsThunk());
      });
  };

  return (
    <div className="h-full flex flex-col relative">
      {/* search input */}
      <SearchInput
        inputVal={inputVal}
        setInputVal={setInputVal}
        onClickIcon={selectAllOrNone}
      />

      <LineWithText className="mt-10 h-[.125rem] relative" color="red">
        <p className="absolute bottom-[-0.625rem] left-[50%] translate-x-[-50%] text-black w-[18.75rem] text-center text-[1rem]">
          You may be interested
        </p>
      </LineWithText>

      {visible && <UserList filter={inputVal} />}

      {isShowBtn && (
        <DrawerConfirmBtn
          onClick={() => setIsModalOpen(true)}
          label="Send invitation"
        />
      )}

      <Modal
        title={
          <p className="relative px-3 text-lg text-slate-800">
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
          value={greetings}
          onInput={(e) => setGreetings((e.target as HTMLInputElement).value)}
        />
      </Modal>
    </div>
  );
};

export default AddFriends;
