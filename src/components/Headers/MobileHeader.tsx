import { BlurGlassDiv } from '@/utils/styles/BlurGlassDiv';
import PureLogo from '../Logo';

const MobileHeader = () => {
  const testFn = () => {
    const subDivs = document.querySelectorAll<HTMLDivElement>('#root>div>div');
    for (let i = 0; i < subDivs.length; i++) {
      if (i === 0) {
        const wide = subDivs[i + 1].getBoundingClientRect().width;
        subDivs[i].style.width = `${wide}px`;
        subDivs[i].style.left = `0.5rem`;
        setTimeout(() => {
          subDivs[i].style.left = ``;
        }, 2000);
        continue;
      }
      subDivs[i].style.transform = 'translateX(-110%)';
      setTimeout(() => {
        subDivs[i].style.transform = '';
      }, 2000);
    }
  };

  return (
    <BlurGlassDiv className="text-white h-12 sm:h-14 flex justify-center items-center shadow-md shadow-[#403637] rounded-md mb-2 lg:hidden">
      <PureLogo height={30} extraClass="lg:hidden" />
      <button className="border bg-rose-500 ml-5" onClick={testFn}>
        Test Button
      </button>
    </BlurGlassDiv>
  );
};

export default MobileHeader;
