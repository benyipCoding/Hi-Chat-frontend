import { RootState } from '@/store';
import clsx from 'clsx';
import { useRef } from 'react';
import { MdInsertEmoticon } from 'react-icons/md';
import { RiScreenshot2Line } from 'react-icons/ri';
import { TbMicrophone } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { pickerHeight } from '../EmojiPicker';

interface ToolBarProps {
  className: string;
  onClickEmoji: (posX: number, posY: number) => void;
}

const ToolBar: React.FC<ToolBarProps> = ({ className, onClickEmoji }) => {
  const toolbar = useRef<HTMLDivElement>(null);

  const { isShowEmojiPicker } = useSelector(
    (state: RootState) => state.conversation
  );

  return (
    <div className={className} ref={toolbar}>
      <RiScreenshot2Line className="cursor-pointer" />
      <TbMicrophone className="cursor-pointer" />
      <MdInsertEmoticon
        className={clsx(
          'cursor-pointer',
          isShowEmojiPicker && 'text-[#ec9131]'
        )}
        onClick={() =>
          onClickEmoji(
            toolbar.current!.offsetLeft,
            toolbar.current!.offsetTop - pickerHeight
          )
        }
      />
    </div>
  );
};

export default ToolBar;
