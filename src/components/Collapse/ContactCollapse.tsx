import { Invitation, User } from '@/utils/types';
import { Collapse, CollapseProps } from 'antd';
import UserItem from '../List/UserItem';
import { addAlphaToHexColor } from '@/utils/helpers';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
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
  const panelStyle: React.CSSProperties = {
    borderBottom: '1px solid',
    borderColor: `${addAlphaToHexColor('#ec9131', 0.7)}`,
  };
  const { user } = useContext(AuthContext);

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <Collapse
      items={getItems({ panelStyle, invitations, currentUser: user! })}
      onChange={onChange}
      bordered={false}
    />
  );
};

export default ContactCollapse;
