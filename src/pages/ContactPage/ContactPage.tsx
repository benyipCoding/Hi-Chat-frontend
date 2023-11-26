// import { RootState } from '@/store';
import { useContext, useState } from 'react';
import { Input } from '@/components/Inputs';
import { IoSearch } from 'react-icons/io5';
import { addAlphaToHexColor } from '@/utils/helpers';
import { SocketContext } from '@/context/SocketContext';
import { SocketEvent } from '@/utils/enum';
import { Invitation, InvitationRecord } from '@/utils/types';
import { defaultAvatar } from '@/components/Avatar/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { addInvitationsRecord } from '@/store/friendsSlice';
import ContactCollapse from '@/components/Collapse/ContactCollapse';
import EmptyState from '@/components/EmptyState';

const ContactPage = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();
  const { invitations } = useSelector((state: RootState) => state.friends);

  socket.on(SocketEvent.ADD_FRIEND_REQUEST_RECORD, (e: InvitationRecord) => {
    const invitation: Invitation = {
      avatar: e.receiver.avatar || defaultAvatar,
      createAt: e.createAt,
      status: e.status,
      message: e.greetings,
    };
    dispatch(addInvitationsRecord(invitation));
  });

  return (
    <div className="h-full flex flex-col">
      <Input
        background={`${addAlphaToHexColor('#edeff6', 0.9)}`}
        type="text"
        placeholder="search"
        value={searchInput}
        onInput={(e) => setSearchInput((e.target as HTMLInputElement).value)}
        icon={<IoSearch />}
      />

      <div className="w-full flex-1 p-2 overflow-y-auto flex flex-col gap-2">
        {invitations.length ? <ContactCollapse /> : <EmptyState />}
      </div>
    </div>
  );
};

export default ContactPage;
