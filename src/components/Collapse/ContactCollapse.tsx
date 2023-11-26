import { Collapse, CollapseProps } from 'antd';

const text = `123123`;

const getItems: (panelStyle: React.CSSProperties) => CollapseProps['items'] = (
  panelStyle
) => {
  return [
    {
      key: '1',
      label: 'Friends',
      children: <p>{text}</p>,
      style: panelStyle,
    },
    {
      key: '2',
      label: 'Invitations',
      children: <>{text}</>,
      style: panelStyle,
    },
  ];
};

const ContactCollapse = () => {
  const panelStyle: React.CSSProperties = {
    borderBottom: '1px solid #ec9131',
    borderColor: '#ec9131',
  };

  const items = getItems(panelStyle);

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
