import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useEffect } from 'react';

const height = '255px';

const Test = () => {
  useEffect(() => {
    setTimeout(() => {
      const emojiPicker =
        document.querySelector<HTMLElement>('em-emoji-picker');
      const shadowRoot = emojiPicker?.shadowRoot;
      const section = shadowRoot?.querySelector('section');
      emojiPicker!.style.height = height;
      section!.style.height = height;
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
    <Picker
      data={data}
      onEmojiSelect={(e: { native: string }) => console.log(e.native)}
    ></Picker>
  );
};

export default Test;
