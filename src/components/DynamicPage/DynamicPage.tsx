import { CommonContext } from '@/context/CommonContext';
import { useTranslate } from '@/hooks/useTranslate';
import { AppDispatch, RootState } from '@/store';
import { BlurGlassDiv } from '@/utils/styles/BlurGlassDiv';
import { LeftOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pageMap } from './pageMap';
import { clearCurrentConversation } from '@/store/conversationSlice';
import { getConversationList } from '@/utils/api';

const DynamicPage = () => {
  const { swipeToList } = useTranslate();
  const divList = useContext(CommonContext);
  const { currentPage, title } = useSelector(
    (state: RootState) => state.dynamicPage
  );
  const dispatch = useDispatch<AppDispatch>();

  const swipeBack = () => {
    swipeToList(divList!);
    getConversationList();
    setTimeout(() => {
      dispatch(clearCurrentConversation());
    }, 300);
  };

  return (
    <div className="mobile-transition absolute left-[100%] top-2 h-[98%] lg:h-full lg:static flex lg:flex-1 flex-col gap-2 text-white">
      <BlurGlassDiv className="text-xl p-2 h-16 lg:h-20 rounded-md lg:flex-shrink-0 flex items-center lg:text-3xl lg:p-4">
        <LeftOutlined
          className="lg:hidden mr-3 md:mr-5 cursor-pointer"
          onClick={swipeBack}
        />
        {title}
      </BlurGlassDiv>
      <BlurGlassDiv className="h-full rounded-md p-2 text-white flex flex-col gap-2 overflow-hidden relative">
        {pageMap[currentPage]}
      </BlurGlassDiv>
    </div>
  );
};

export default DynamicPage;
