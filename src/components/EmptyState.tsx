import { Button, Empty } from 'antd';

interface EmptyStateProps {
  label: string;
  onClick: () => void;
  btnLabel: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  label,
  onClick,
  btnLabel,
}) => {
  return (
    <Empty
      image={
        <img
          src="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          className="object-cover w-full"
        />
      }
      description={<span className="text-white text-lg">{label}</span>}
      className="flex-1 flex flex-col justify-center items-center"
    >
      <Button
        className="bg-gradient-to-r from-violet-600 to-indigo-600"
        onClick={onClick}
      >
        <span className="text-white">{btnLabel}</span>
      </Button>
    </Empty>
  );
};

export default EmptyState;
