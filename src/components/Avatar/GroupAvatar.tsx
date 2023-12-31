import { User } from '@/utils/types';
import clsx from 'clsx';
import React from 'react';
import { defaultAvatar } from './Avatar';

interface GroupAvatarProps {
  members: User[];
  fixedSize?: boolean;
}

const GroupAvatar: React.FC<GroupAvatarProps> = ({
  members,
  fixedSize = false,
}) => {
  const miniSize = members.length >= 5;

  return (
    <div
      className={clsx(
        'w-[70px] h-[70px] sm:w-20 flex rounded-md relative overflow-hidden flex-shrink-0 flex-wrap gap-[1px] p-[1px] justify-center bg-[#80808075] center',
        !fixedSize && 'lg:w-14 lg:h-14'
      )}
    >
      {members.slice(0, 9).map((user) => (
        <img
          src={user.avatar || defaultAvatar}
          className={`${
            miniSize
              ? 'w-[22px] h-[22px] lg:w-4 lg:h-4'
              : 'w-8 h-8 lg:w-6 lg:h-6'
          }`}
          key={user.id}
        />
      ))}
    </div>
  );
};

export default GroupAvatar;
