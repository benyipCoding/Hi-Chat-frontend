import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useEffect } from 'react';

interface EmojiPickerProps {
  className: string;
  style?: React.CSSProperties;
  onEmojiSelect: (emo: string) => void;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({
  className,
  style,
  onEmojiSelect,
}) => {
  useEffect(() => {
    setTimeout(() => {
      const emojiPicker =
        document.querySelector<HTMLElement>('em-emoji-picker');
      const shadowRoot = emojiPicker?.shadowRoot;
      const section = shadowRoot?.querySelector('section');
      emojiPicker!.style.height = '14.1rem';
      section!.style.height = '14.1rem';
      const searchBar = section?.querySelector<HTMLDivElement>('.padding-lr');
      searchBar!.style.display = 'none';
      const frequent = section?.querySelector<HTMLDivElement>(
        '[data-id="frequent"]'
      );
      frequent!.style.height = '0';
      const scroll = section?.querySelector<HTMLDivElement>('.scroll>div');
      scroll!.style.width = '100%';
      const bottom = section?.querySelector<HTMLDivElement>('#preview');
      bottom!.style.display = 'none';
    }, 0);
  }, []);

  return (
    <div className={className} style={style}>
      <Picker
        data={data}
        onEmojiSelect={(e: { native: string }) => onEmojiSelect(e.native)}
      ></Picker>
    </div>
  );
};

export default EmojiPicker;
