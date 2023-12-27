import { formatUserName } from '@/utils/helpers';
import { FaFemale } from 'react-icons/fa';
import { BiMale } from 'react-icons/bi';
import { Gender, User } from '@/utils/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface ProfileDescProps {
  user?: User;
}

const ProfileDesc: React.FC<ProfileDescProps> = ({ user }) => {
  const { targetUser } = useSelector((state: RootState) => state.profile);
  const displayUser = user || targetUser;

  return (
    <div className=" flex flex-col justify-evenly text-sm text-gray-300">
      <p className="text-3xl text-white flex items-center">
        {formatUserName(
          user?.displayName || targetUser?.nickname || targetUser?.displayName
        )}
        {displayUser?.gender === Gender.FEMALE ? (
          <FaFemale className="text-pink-300 text-xl ml-2" />
        ) : (
          <BiMale className="text-blue-300 text-2xl ml-2" />
        )}
      </p>
    </div>
  );
};

export default ProfileDesc;
