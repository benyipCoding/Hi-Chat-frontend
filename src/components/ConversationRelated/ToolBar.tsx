import { RootState } from '@/store';
import clsx from 'clsx';
import { MdInsertEmoticon } from 'react-icons/md';
import { RiScreenshot2Line } from 'react-icons/ri';
import { TbMicrophone } from 'react-icons/tb';
import { useSelector } from 'react-redux';

interface ToolBarProps {
  className: string;
  onClickEmoji?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const ToolBar: React.FC<ToolBarProps> = ({ className, onClickEmoji }) => {
  const { isShowEmojiPicker } = useSelector(
    (state: RootState) => state.conversation
  );

  return (
    <div className={className}>
      <RiScreenshot2Line className="cursor-pointer" />
      <TbMicrophone className="cursor-pointer" />
      <MdInsertEmoticon
        className={clsx(
          'cursor-pointer',
          isShowEmojiPicker && 'text-[#ec9131]'
        )}
        onClick={onClickEmoji}
      />
    </div>
  );
};

export default ToolBar;
