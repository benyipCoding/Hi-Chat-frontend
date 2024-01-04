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
} from '@/store/dropMenuSlice';
import { postDeleteGroup, postRenameGroup } from '@/utils/api';
import { fetchGroupConvList } from '@/store/groupConversationSlice';
import { setTitle } from '@/store/dynamicPageSlice';
import clsx from 'clsx';
import { toast } from 'react-toastify';

const CustomModal = () => {
  const { customModalVisible, modalInput, currentGroupConvId, isRename } =
    useSelector((state: RootState) => state.dropMenu);

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
        dispatch(setTitle(modalInput));
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

  const onConfirm = () => {
    if (isRename) {
      renameHandler();
    } else {
      deleteHandler();
    }
  };

  return (
    <Modal
      title={
        <p className="relative px-3 text-lg text-slate-800">
          <span
            className={clsx(
              'w-[5px] h-[80%] absolute left-0 rounded-full top-[50%] translate-y-[-50%]',
              isRename ? 'bg-[#0284c7]' : 'bg-[red]'
            )}
          ></span>
          {isRename ? 'Rename Group' : 'Delete Group'}
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
      {isRename ? (
        <Input
          type="text"
          placeholder="What's the name of this group"
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
