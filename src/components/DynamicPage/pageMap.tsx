import Conversations from '@/pages/Conversations/Conversations';

export enum DynamicPageName {
  CONVERSATION = 'conversation',
  PROFILE = 'profile',
}

export const pageMap = {
  [DynamicPageName.CONVERSATION]: <Conversations />,
  [DynamicPageName.PROFILE]: <div>profile content</div>,
};
