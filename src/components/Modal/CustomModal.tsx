/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, notification } from 'antd';
import { motion } from 'framer-motion';
import { Input } from '../Inputs';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import {
  setCurrentGroupConvId,
  setCustomModalVisible,
  setModalInput,
  setTargetMember,
} from '@/store/dropMenuSlice';
import {
  postDeleteGroup,
  postFriendInvitation,
  postRenameGroup,
} from '@/utils/api';
import { fetchGroupConvList } from '@/store/groupConversationSlice';
import { setTitle } from '@/store/dynamicPageSlice';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { fetchInvitationsThunk } from '@/store/friendsSlice';

const CustomModal = () => {
  const {
    customModalVisible,
    modalInput,
    currentGroupConvId,
    modalContent,
    targetMember,
  } = useSelector((state: RootState) => state.dropMenu);

  const { currentConversation } = useSelector(
    (state: RootState) => state.conversation
  );

  const dispatch = useDispatch<AppDispatch>();
  const onInput = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch(setModalInput((e.target as HTMLInputElement).value));
  };
  const renameHandler = () => {
    if (!modalInput) {
      notification.error({
        message: 'Please input a group name.',
        duration: 3,
      });
      return;
    }
    postRenameGroup({
      groupName: modalInput,
      groupConvId: currentGroupConvId,
    })
      .then((res) => {
        console.log(res.data);
        if (currentConversation?.id === currentGroupConvId) {
          dispatch(setTitle(modalInput));
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(setCurrentGroupConvId(0));
        dispatch(setCustomModalVisible(false));
        dispatch(fetchGroupConvList());
        dispatch(setModalInput(''));
      });
  };
  const deleteHandler = () => {
    postDeleteGroup(currentGroupConvId)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        toast.error(err.data);
      })
      .finally(() => {
        dispatch(setCurrentGroupConvId(0));
        dispatch(setCustomModalVisible(false));
        dispatch(fetchGroupConvList());
        dispatch(setModalInput(''));
      });
  };
  const addFriendFromGroupHandler = () => {
    postFriendInvitation({
      userIds: [targetMember!.id],
      greetings: modalInput,
    })
      .then((res) => {
        toast.success(`${res.data} Invitations sent`);
      })
      .catch((err) => {
        toast.error(err.data);
      })
      .finally(() => {
        dispatch(setCustomModalVisible(false));
        dispatch(setModalInput(''));
        dispatch(setTargetMember(null));
        dispatch(fetchInvitationsThunk());
      });
  };

  const onConfirm = () => {
    if (!modalInput && modalContent !== 'delete') {
      notification.warning({
        message: 'Empty content',
        duration: 3,
      });
      return;
    }
    if (modalContent === 'rename') renameHandler();
    else if (modalContent === 'delete') deleteHandler();
    else if (modalContent === 'add friend') addFriendFromGroupHandler();
  };

  return (
    <Modal
      title={
        <p className="relative px-3 text-lg text-slate-800">
          <span
            className={clsx(
              'w-[5px] h-[80%] absolute left-0 rounded-full top-[50%] translate-y-[-50%]',
              modalContent !== 'delete' ? 'bg-[#0284c7]' : 'bg-[red]'
            )}
          ></span>
          {modalContent === 'rename'
            ? 'Rename Group'
            : modalContent === 'delete'
            ? 'Delete Group'
            : 'Send Greeting'}
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
              dispatch(setModalInput(''));
              dispatch(setTargetMember(null));
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
      {modalContent === 'rename' || modalContent === 'add friend' ? (
        <Input
          type="text"
          placeholder={
            modalContent === 'rename'
              ? "What's the name of this group"
              : 'Say hello to your friend'
          }
          value={modalInput}
          onInput={(e) => onInput(e)}
        />
      ) : (
        <h2 className="text-black">
          Delete group will remove all messages of the group.Are you sure?
        </h2>
      )}
    </Modal>
  );
};

export default CustomModal;
