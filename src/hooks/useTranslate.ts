import { useScreenSize } from './useScreenSize';

export function useTranslate() {
  const isLarge = useScreenSize();

  const swipeToDetail = (elements: NodeListOf<HTMLDivElement>) => {
    if (isLarge() || !elements.length) return;
    for (let i = 0; i < elements.length; i++) {
      if (i === 0) {
        const wide = elements[i + 1].getBoundingClientRect().width;
        elements[i].style.width = `${wide}px`;
        elements[i].style.left = `0.5rem`;
        continue;
      }
      elements[i].style.transform = 'translateX(-110%)';
    }
  };

  const swipeToList = (elements: NodeListOf<HTMLDivElement>) => {
    if (isLarge() || !elements.length) return;
    for (let i = 0; i < elements.length; i++) {
      if (i === 0) {
        elements[i].style.left = ``;
        continue;
      }
      elements[i].style.transform = '';
    }
  };

  return {
    swipeToDetail,
    swipeToList,
  };
}
