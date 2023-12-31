import { Invitation, User } from '@/utils/types';
import { Collapse, CollapseProps } from 'antd';
import UserItem from '../List/UserItem';
import { FRIENDS_COUNT, addAlphaToHexColor } from '@/utils/helpers';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { clearFriendListBadge, setUntreatedCount } from '@/store/friendsSlice';
import { setDefaultActiveKey } from '@/store/contactPageSlice';
// #region
type GetItemsParams = {
  panelStyle: React.CSSProperties;
  invitations: Invitation[];
  currentUser: User;
  friendList: User[];
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
      children: (
        <div className="overflow-y-auto">
          {params.friendList.map((friend) => (
            <UserItem
              user={friend}
              key={friend.id}
              showDescription={false}
              isFriendList={true}
            />
          ))}
        </div>
      ),
      style: params.panelStyle,
      headerClass: `text-lg`,
    },
    {
      key: '1',
      label: 'Invitations',
      children: (
        <div className="overflow-y-auto">
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
        </div>
      ),
      style: params.panelStyle,
      headerClass: `text-lg`,
    },
  ];
};
// #endregion

interface ContactCollapseProps {
  invitations: Invitation[];
  friendList: User[];
}

const ContactCollapse: React.FC<ContactCollapseProps> = ({
  invitations,
  friendList,
}) => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();
  const { untreatedCount, friendListBadge, friends } = useSelector(
    (state: RootState) => state.friends
  );
  const items = getItems({
    panelStyle,
    invitations,
    currentUser: user!,
    friendList,
  });
  const { defaultActiveKey } = useSelector(
    (state: RootState) => state.contactPage
  );

  const onChange = (key: string | string[]) => {
    if (key.includes('1')) dispatch(setUntreatedCount(0));
    if (key.includes('0')) {
      localStorage.setItem(
        `${user?.name}` + FRIENDS_COUNT,
        JSON.stringify(friends.length)
      );
      dispatch(clearFriendListBadge());
    }
    dispatch(setDefaultActiveKey(key as string[]));
  };

  useEffect(() => {
    const headers = document.querySelectorAll('.ant-collapse-header');
    if (untreatedCount !== 0) {
      headers[1].classList.add('badge');
      headers[1].setAttribute('data-content', `${untreatedCount}`);
    } else {
      headers[1].classList.remove('badge');
    }

    if (friendListBadge !== 0) {
      headers[0].classList.add('badge');
      headers[0].setAttribute('data-content', `${friendListBadge}`);
    } else {
      headers[0].classList.remove('badge');
    }
  }, [untreatedCount, friendListBadge]);

  return (
    <Collapse
      items={items}
      onChange={onChange}
      bordered={false}
      defaultActiveKey={defaultActiveKey}
    />
  );
};

export default ContactCollapse;
