import { LineWithText } from '@/utils/styles/LineWithText';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from '../Inputs';
import Avatar from '../Avatar/Avatar';
import { motion } from 'framer-motion';
import { BlurGlassDiv } from '@/utils/styles/BlurGlassDiv';

const AddFriends = () => {
  const arr = new Array(30).fill(1);

  return (
    <div className="h-full flex flex-col relative">
      {/* search input */}
      <div className="h-[2.25rem] flex items-center w-full gap-2">
        <Input placeholder="search name or email" type="text" />
        <SearchOutlined className="w-16 h-full bg-sky-600 flex justify-center items-center text-white rounded-md text-[1.25rem] cursor-pointer" />
      </div>

      <LineWithText className="mt-10 h-[.125rem] relative" color="red">
        <p className="absolute bottom-[-0.625rem] left-[50%] translate-x-[-50%] text-black w-[18.75rem] text-center text-[1rem]">
          You may be interested
        </p>
      </LineWithText>

      <ul className="mt-6 flex-1 overflow-y-auto scroll-bar grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-2 sm:gap-3 pb-12">
        {arr.map((_, index) => (
          <motion.li
            whileTap={{ scale: 0.9 }}
            className="h-28 flex flex-col justify-center items-center gap-1 sm:py-2 rounded-md hover:bg-[#0000001b] active:bg-[#0000001e] cursor-pointer"
            key={index}
          >
            <Avatar
              userName="Jack"
              src="/images/avatar/1.jpeg"
              fixedSize={true}
            />
            <p>Jack</p>
          </motion.li>
        ))}
      </ul>
      <BlurGlassDiv className="h-14 absolute bottom-0 w-[100%] flex justify-center items-center">
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="bg-[#0284c7] h-[70%] w-[80%] flex items-center justify-center rounded-full text-white text-[20px]"
        >
          Send invitation
        </motion.button>
      </BlurGlassDiv>
    </div>
  );
};

export default AddFriends;
