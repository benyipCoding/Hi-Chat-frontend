import { Invitation, User } from '@/utils/types';
import { Collapse, CollapseProps } from 'antd';
import UserItem from '../List/UserItem';
import { addAlphaToHexColor } from '@/utils/helpers';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import ContactBadge from '../Badge/ContactBadge';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { selectInvitationsByUserId } from '@/store/friendsSlice';
// #region
type GetItemsParams = {
  panelStyle: React.CSSProperties;
  invitations: Invitation[];
  currentUser: User;
};

const handleLastMessage = (lastMessage: string): string => {
  if (!lastMessage) return '';
  const separator = '&nbsp;';
  const isMultiple = lastMessage.includes(separator);
  if (!isMultiple) return lastMessage;
  const messages = lastMessage.split(separator);
  const length = messages.length;
  return messages[length - 1];
};

const panelStyle: React.CSSProperties = {
  borderBottom: '1px solid',
  borderColor: `${addAlphaToHexColor('#ec9131', 0.7)}`,
};

const getItems: (params: GetItemsParams) => CollapseProps['items'] = (
  params
) => {
  return [
    {
      key: '0',
      label: 'Friends',
      children: <p>123123</p>,
      style: params.panelStyle,
      headerClass: `text-lg`,
    },
    {
      key: '1',
      label: 'Invitations',
      children: (
        <>
          {params.invitations.map((invitation) => (
            <UserItem
              user={
                params.currentUser.id === invitation.receiver.id
                  ? invitation.sender
                  : invitation.receiver
              }
              key={invitation.id}
              updateAt={invitation.updateAt}
              status={invitation.status}
              lastMessage={handleLastMessage(invitation.greetings)}
              sender={invitation.sender}
              invitationId={invitation.id}
            />
          ))}
        </>
      ),
      style: params.panelStyle,
      headerClass: `text-lg`,
    },
  ];
};
// #endregion

interface ContactCollapseProps {
  invitations: Invitation[];
}

const ContactCollapse: React.FC<ContactCollapseProps> = ({ invitations }) => {
  const { user } = useContext(AuthContext);
  const items = getItems({ panelStyle, invitations, currentUser: user! });

  const filterInvitations = useSelector((state: RootState) =>
    selectInvitationsByUserId(state, user!.id)
  );

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <>
      <Collapse items={items} onChange={onChange} bordered={false} />
      {items?.map((_item, index) => (
        <ContactBadge key={index} index={index} badgeCount={index} />
      ))}
    </>
  );
};

export default ContactCollapse;
