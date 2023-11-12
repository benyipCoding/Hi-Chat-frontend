import React from 'react';

interface AvatarDescProps {
  userName: string;
  lastMessage: string;
  showLastMessage?: boolean;
}

const AvatarDesc: React.FC<AvatarDescProps> = ({
  userName,
  lastMessage,
  showLastMessage = true,
}) => {
  return (
    <div className="flex-1 rounded-sm flex flex-col border-b-[1px] border-[#98d3df80]">
      <p className="flex-1 text-xl flex items-center pl-1 sm:text-2xl lg:text-[20px]">
        {userName}
      </p>
      {showLastMessage && (
        <p className="flex-1 text-sm flex items-center text-[#b5bac1] pl-1 sm:text-lg lg:text-sm">
          {lastMessage}
        </p>
      )}
    </div>
  );
};

export default AvatarDesc;
