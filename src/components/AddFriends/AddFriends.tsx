import { LineWithText } from '@/utils/styles/LineWithText';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Input } from '../Inputs';
import { motion } from 'framer-motion';
import { BlurGlassDiv } from '@/utils/styles/BlurGlassDiv';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';

import UserList from '../List/UserList';
import { useEffect, useMemo, useState } from 'react';
import { allOrNone } from '@/store/friendsSlice';

const AddFriends = () => {
  const { visible } = useSelector((state: RootState) => state.drawer);
  const [inputVal, setInputVal] = useState<string>('');
  const onInput = (e: React.FormEvent<HTMLInputElement>) => {
    setInputVal((e.target as HTMLInputElement).value);
  };
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

  return (
    <div className="h-full flex flex-col relative">
      {/* search input */}
      <div className="h-[2.25rem] flex items-center w-full gap-2">
        <Input
          placeholder="Please input user name."
          type="text"
          onInput={onInput}
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
          >
            Send invitation
          </motion.button>
        </BlurGlassDiv>
      )}
    </div>
  );
};

export default AddFriends;
