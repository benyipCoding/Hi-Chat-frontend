/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch, RootState } from '@/store';
import { setCurrentPage, setTitle } from '@/store/dynamicPageSlice';
import { useDispatch, useSelector } from 'react-redux';
import { DynamicPageName } from '../DynamicPage/pageMap';
import {
  postChangeNickname,
  postCreateConversation,
  postDeleteFriendship,
} from '@/utils/api';
import { setCurrentConversation } from '@/store/conversationSlice';
import Avatar, { defaultAvatar } from '../Avatar/Avatar';
import ProfileDesc from '../Avatar/ProfileDesc';
import { User } from '@/utils/types';
import { motion } from 'framer-motion';
import { Modal } from 'antd';
import { useState } from 'react';
import { Input } from '../Inputs';
import { toast } from 'react-toastify';
import {
  setModalTitle,
  setTargetUser,
  toggleProfileModalVisible,
} from '@/store/profileSlice';
import { fetchFriendsThunk } from '@/store/friendsSlice';
import clsx from 'clsx';

type DescItemType = {
  label: string;
  value: keyof User;
  type: string;
};

const descList: DescItemType[] = [
  {
    label: 'Username',
    value: 'name',
    type: 'text',
  },
  {
    label: 'Gender',
    value: 'gender',
    type: 'text',
  },
  {
    label: 'Email',
    value: 'email',
    type: 'email',
  },
];

interface ProfileProps {
  user?: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalInput, setModalInput] = useState<string>('');
  const [isDeleteContent, setIsDeleteContent] = useState<boolean>(false);
  const { targetUser } = useSelector((state: RootState) => state.profile);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [profileForm, setProfileForm] = useState({
    name: user?.name,
    email: user?.email,
    gender: user?.gender,
  });

  const startConversation = () => {
    postCreateConversation(targetUser!).then((res) => {
      dispatch(setCurrentPage(DynamicPageName.CONVERSATION));
      dispatch(setCurrentConversation(res.data));
    });
  };

  const openModal = () => {
    setModalInput((targetUser?.nickname || targetUser?.displayName) as string);
    setIsDeleteContent(false);
    setIsModalOpen(true);
  };

  const askTwice = () => {
    setIsDeleteContent(true);
    setIsModalOpen(true);
  };

  const editMyProfile = () => {
    setEditMode((prev) => !prev);
    console.log(profileForm);

    // dispatch(setModalTitle('Edit My Profile'));
    // dispatch(toggleProfileModalVisible(true));
  };

  const changeAvatar = () => {
    if (editMode) return;
    dispatch(setModalTitle('Change Avatar'));
    dispatch(toggleProfileModalVisible(true));
  };

  const btnList = [
    {
      label: 'Change Nickname',
      bg: 'bg-gradient-to-br from-violet-600 to-indigo-600',
      onClick: openModal,
    },
    {
      label: 'Start Chat',
      bg: 'bg-gradient-to-tr from-lime-400 to-lime-500',
      onClick: startConversation,
    },
    {
      label: 'Delete Friend',
      bg: 'bg-gradient-to-br from-rose-500 to-yellow-500',
      onClick: askTwice,
    },
  ];

  const selfBtnList = [
    {
      label: `${editMode ? 'Confirm' : 'Edit My Profile'}`,
      bg: 'bg-gradient-to-br from-violet-500 to-purple-500',
      onClick: editMyProfile,
    },
    {
      label: 'Change Avatar',
      bg:
        'bg-gradient-to-bl from-amber-500 to-pink-500' +
        ` ${editMode && 'cursor-not-allowed opacity-60'}`,
      onClick: changeAvatar,
    },
  ];

  const buttons = user ? selfBtnList : btnList;

  const changeNicknameHandler = () => {
    if (!modalInput) return toast.error('Nickname should not be empty!');
    postChangeNickname({ targetUserId: targetUser!.id, nickname: modalInput })
      .then((res) => {
        dispatch(
          setTargetUser({
            ...targetUser!,
            nickname: res.data.nickname,
          })
        );
        dispatch(fetchFriendsThunk());
        dispatch(setTitle(res.data.nickname));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsModalOpen(false));
  };

  const deleteFriendHandler = () => {
    postDeleteFriendship(targetUser!.id)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsModalOpen(false));
  };

  const onModalConfirm = () => {
    if (!isDeleteContent) {
      changeNicknameHandler();
    } else {
      deleteFriendHandler();
    }
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    setProfileForm((prev) => ({
      ...prev,
      [input.name]: input.value,
    }));
  };

  return (
    <div className="h-full">
      {/* content */}
      <div className="p-4 bg-[#0000005e] rounded-md">
        <div className="flex gap-4">
          <Avatar src={user?.avatar || targetUser?.avatar || defaultAvatar} />
          <ProfileDesc user={user} />
        </div>
        <div className="mt-10 flex flex-col gap-4">
          {descList.map((item, index) => (
            <section
              className="flex border-b border-b-orange-400 pb-2"
              key={index}
            >
              <span className="w-[40%] font-semibold">{item.label} :</span>

              {editMode ? (
                <input
                  name={item.value}
                  type={item.type}
                  value={(profileForm as any)[item.value]}
                  className="text-black box-border outline-none bg-slate-100 max-w-[180px] px-1"
                  onInput={(e) => handleInput(e)}
                />
              ) : (
                <span className="flex-1">
                  {user ? user[item.value] : targetUser![item.value]}
                </span>
              )}
            </section>
          ))}
        </div>
      </div>
      {/* btn */}
      <div className="flex flex-col lg:flex-row lg:gap-4">
        {buttons.map((item, index) => (
          <motion.div
            whileTap={{ scale: 0.9 }}
            className={`mt-4 rounded-full flex justify-center items-center shadow-lg flex-1 ${item.bg} cursor-pointer py-2 active:shadow-sm`}
            key={index}
            onClick={item.onClick}
          >
            {item.label}
          </motion.div>
        ))}
      </div>

      <Modal
        title={
          <p className="relative px-3 text-lg text-slate-800">
            <span
              className={clsx(
                'w-[5px] h-[80%] absolute left-0 rounded-full top-[50%] translate-y-[-50%]',
                isDeleteContent ? 'bg-[#f34b56]' : 'bg-[#0284c7]'
              )}
            ></span>
            {isDeleteContent ? 'Tips' : 'Change Nickname'}
          </p>
        }
        open={isModalOpen}
        closeIcon={false}
        footer={
          <>
            <motion.button
              className="text-[#0284c7] py-2 px-3 rounded-md border mr-3 border-[#0284c7]"
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setModalInput('');
                setIsModalOpen(false);
              }}
            >
              Cancel
            </motion.button>
            <motion.button
              className="bg-[#0284c7] text-white py-2 px-3 rounded-md"
              whileTap={{ scale: 0.9 }}
              onClick={onModalConfirm}
            >
              Confirm
            </motion.button>
          </>
        }
      >
        {!isDeleteContent ? (
          <Input
            type="text"
            placeholder="Input nickname"
            value={modalInput}
            onInput={(e) => setModalInput((e.target as HTMLInputElement).value)}
          />
        ) : (
          <div className="text-black">
            {`Are you sure you want to delete ${
              targetUser?.nickname || targetUser?.displayName
            }?`}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Profile;
