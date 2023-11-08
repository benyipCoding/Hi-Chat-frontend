import { BlurGlassDiv } from '@/utils/styles/BlurGlassDiv';
import PureLogo from '../Logo';

const MobileHeader = () => {
  return (
    <BlurGlassDiv className="mobile-transition text-white h-12 sm:h-14 flex justify-center items-center shadow-md shadow-[#403637] rounded-md mb-2 lg:hidden">
      <PureLogo height={30} extraClass="lg:hidden" />
    </BlurGlassDiv>
  );
};

export default MobileHeader;
