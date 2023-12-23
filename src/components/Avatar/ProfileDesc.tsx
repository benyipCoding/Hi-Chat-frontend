import { formatUserName } from '@/utils/helpers';
import { FaFemale } from 'react-icons/fa';
import { BiMale } from 'react-icons/bi';
import { Gender } from '@/utils/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const ProfileDesc = () => {
  const { targetUser } = useSelector((state: RootState) => state.profile);

  return (
    <div className=" flex flex-col justify-evenly text-sm text-gray-300">
      <p className="text-3xl text-white flex items-center">
        {formatUserName(targetUser?.nickname)}
        {targetUser?.gender === Gender.FEMALE ? (
          <FaFemale className="text-pink-300 text-xl ml-2" />
        ) : (
          <BiMale className="text-blue-300 text-2xl ml-2" />
        )}
      </p>
    </div>
  );
};

export default ProfileDesc;
