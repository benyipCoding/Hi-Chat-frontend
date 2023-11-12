import { BlurGlassDiv } from '@/utils/styles/BlurGlassDiv';
import PureLogo from '../Logo';
// import { getMockFriends } from '@/utils/api';

const MobileHeader = () => {
  // const mockFriends = async () => {
  //   const res = await getMockFriends();
  //   console.log(res);
  // };

  return (
    <BlurGlassDiv className="mobile-transition text-white h-12 sm:h-14 flex justify-center items-center shadow-md shadow-[#403637] rounded-md mb-2 lg:hidden">
      <PureLogo height={30} extraClass="lg:hidden" />
      {/* <button className="bg-rose-500 border" onClick={mockFriends}>
        mock friends
      </button> */}
    </BlurGlassDiv>
  );
};

export default MobileHeader;
