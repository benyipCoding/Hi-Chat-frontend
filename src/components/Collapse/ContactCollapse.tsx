import { Invitation } from '@/utils/types';
import { Collapse, CollapseProps } from 'antd';
import UserItem from '../List/UserItem';
import { addAlphaToHexColor } from '@/utils/helpers';
// #region
type GetItemsParams = {
  panelStyle: React.CSSProperties;
  invitations: Invitation[];
};

const getItems: (params: GetItemsParams) => CollapseProps['items'] = (
  params
) => {
  return [
    {
      key: 'friends',
      label: 'Friends',
      children: <p>123123</p>,
      style: params.panelStyle,
    },
    {
      key: 'invitations',
      label: 'Invitations',
      children: (
        <>
          {params.invitations.map((invitation) => (
            <UserItem user={invitation.receiver} key={invitation.id} />
          ))}
        </>
      ),
      style: params.panelStyle,
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

  const items = getItems({ panelStyle, invitations });

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <Collapse
      items={items}
      // defaultActiveKey={['1']}
      onChange={onChange}
      bordered={false}
    />
  );
};

export default ContactCollapse;
