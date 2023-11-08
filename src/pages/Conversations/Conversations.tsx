import { CommonContext } from '@/context/CommonContext';
import { useTranslate } from '@/hooks/useTranslate';
import { BlurGlassDiv } from '@/utils/styles/BlurGlassDiv';
import { LeftOutlined } from '@ant-design/icons';
import { useContext } from 'react';

const Conversations = () => {
  const { swipeToList } = useTranslate();
  const divList = useContext(CommonContext);

  const swipeBack = () => {
    swipeToList(divList!);
  };

  return (
    <div className="mobile-transition absolute left-[100%] top-2 h-[98%] lg:h-full lg:static flex lg:flex-1 flex-col gap-2 text-white">
      <BlurGlassDiv className="text-xl p-2 h-16 lg:h-20 rounded-md lg:flex-shrink-0 flex items-center lg:text-3xl lg:p-4">
        <LeftOutlined
          className="lg:hidden mr-3 md:mr-5 cursor-pointer"
          onClick={swipeBack}
        />
        Conversation Title
      </BlurGlassDiv>
      <BlurGlassDiv className="h-full rounded-md p-2 text-white flex flex-col gap-2">
        <div className="rounded-md bg-[#0000005e] h-[80%] p-2">Screen</div>
        <div className="rounded-md bg-[#0000005e] h-[20%] p-2">Input</div>
      </BlurGlassDiv>
    </div>
  );
};

export default Conversations;
