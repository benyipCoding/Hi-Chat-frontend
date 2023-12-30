import { BlurGlassDiv } from '@/utils/styles/BlurGlassDiv';
import PureLogo from '../Logo';
import DrawerBtn from '../Drawer/DrawerBtn';

const MobileHeader = () => {
  return (
    <BlurGlassDiv className="mobile-transition text-white h-12 sm:h-14 flex justify-center items-center shadow-md shadow-[#403637] rounded-md mb-2 lg:hidden relative">
      <PureLogo height={30} extraClass="lg:hidden" />
      <DrawerBtn />
    </BlurGlassDiv>
  );
};

export default MobileHeader;
