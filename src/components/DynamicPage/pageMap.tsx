import Conversations from '@/pages/Conversations/Conversations';
import Profile from '../Profile/Profile';

export enum DynamicPageName {
  CONVERSATION = 'conversation',
  PROFILE = 'profile',
}

export const pageMap = {
  [DynamicPageName.CONVERSATION]: <Conversations />,
  [DynamicPageName.PROFILE]: <Profile />,
};
