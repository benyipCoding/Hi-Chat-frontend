import { useState } from 'react';
import SearchInput from '../Inputs/SearchInput';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import {
  clearGroupSelected,
  groupAllOrNone,
  selectFriendByName,
  setFriendGroupSelected,
} from '@/store/friendsSlice';
import ChooseFriendsItem from '../List/ChooseFriendsItem';
import { User } from '@/utils/types';
import DrawerConfirmBtn from '../Buttons/DrawerConfirmBtn';
import { postCreateGroupConversation } from '@/utils/api';
import { dropRepeat } from '@/utils/helpers';
import { toggleVisible } from '@/store/drawerSlice';
import { toast } from 'react-toastify';
import { Modal, notification } from 'antd';
import { motion } from 'framer-motion';
import { Input } from '../Inputs';

const GroupChatMenu = () => {
  const [inputVal, setInputVal] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [groupName, setGroupName] = useState<string>('');

  const friends = useSelector((state: RootState) =>
    selectFriendByName(state, inputVal)
  );

  const selectAllOrNone = () => {
    dispatch(groupAllOrNone());
  };

  const onClickItem = (
    e: React.ChangeEvent<HTMLInputElement>,
    targetUser: User
  ) => {
    dispatch(
      setFriendGroupSelected({ targetUser, groupSelected: e.target.checked })
    );
  };

  const isShowBtn = friends.some((f) => f.groupSelected);

  const createGroupChat = () => {
    setIsModalOpen(true);
    setGroupName('');
  };

  const onConfirm = () => {
    const friendsIds = dropRepeat(
      friends.filter((f) => f.groupSelected).map((f) => f.id)
    );
    if (!groupName) {
      notification.error({
        message: 'Please input a group name.',
        duration: 3,
      });
      return;
    }

    postCreateGroupConversation({ members: friendsIds, groupName })
      .then(() => {
        dispatch(toggleVisible(false));
        dispatch(clearGroupSelected());
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.data);
      });
  };

  return (
    <div className="h-full flex flex-col gap-3 relative">
      {/* search input */}
      <SearchInput
        inputVal={inputVal}
        setInputVal={setInputVal}
        onClickIcon={selectAllOrNone}
      />
      {/* list */}
      <div className="flex-1 overflow-y-auto flex flex-col scroll-bar rounded-md p-2 gap-2">
        {friends.map((friend) => (
          <ChooseFriendsItem
            user={friend}
            key={friend.id}
            onClick={(e) => onClickItem(e, friend)}
          />
        ))}
      </div>
      {/* confirm btn */}
      {isShowBtn && (
        <DrawerConfirmBtn label="Create new group" onClick={createGroupChat} />
      )}
      {/* modal */}
      <Modal
        title={
          <p className="relative px-3 text-lg text-slate-800">
            <span className="w-[5px] h-[80%] bg-[#0284c7] absolute left-0 rounded-full top-[50%] translate-y-[-50%]"></span>
            GROUP NAME
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
          placeholder="What's the name of this group"
          value={groupName}
          onInput={(e) => setGroupName((e.target as HTMLInputElement).value)}
        />
      </Modal>
    </div>
  );
};

export default GroupChatMenu;
