import { AuthContext } from '@/context/AuthContext';
import { formatCommentTime, formatUserName } from '@/utils/helpers';
import { FriendshipStatus, User } from '@/utils/types';
import { Typography } from 'antd';
import clsx from 'clsx';
import React, { useContext, useState } from 'react';
import { StatusMap } from './constant';
// import dayjs from 'dayjs';

interface AvatarDescProps {
  userName: string;
  lastMessage: string;
  status?: FriendshipStatus;
  updateAt?: Date;
  sender?: User;
}

const AvatarDesc: React.FC<AvatarDescProps> = ({
  userName,
  lastMessage,
  sender,
  status,
  updateAt,
}) => {
  const { Paragraph } = Typography;
  const [ellipsis, setEllipsis] = useState<boolean>(true);
  const { user } = useContext(AuthContext);
  const CapitalName = formatUserName(userName);

  const onClick = () => {
    setEllipsis((prev) => !prev);
  };

  return (
    <div
      className="flex-1 rounded-sm flex flex-col border-b-[1px] border-[#98d3df80] relative text-white"
      onClick={onClick}
    >
      <p className="flex-1 text-2xl flex items-center pl-1 sm:text-2xl lg:text-[20px] drop-shadow-md">
        {CapitalName}
      </p>

      <Paragraph
        ellipsis={ellipsis ? { rows: 1, suffix: '' } : false}
        className="flex-1 text-md flex items-center text-[white] pl-1 sm:text-lg lg:text-sm w-[60%] sm:w-[70%] lg:w-[55%]"
      >
        {`${formatUserName(sender?.name)}: ` + lastMessage}
      </Paragraph>

      <div className="absolute right-0 text-gray-200">
        {formatCommentTime(updateAt!)}
      </div>

      <div className="absolute right-0 bottom-[15px]">
        {user?.id === sender?.id ? (
          <div
            className={clsx(
              'text-lg flex items-center font-semibold',
              StatusMap.get(status!)
            )}
          >
            {formatUserName(status)}
          </div>
        ) : (
          <div>按钮组</div>
        )}
      </div>
    </div>
  );
};

export default AvatarDesc;
