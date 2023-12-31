import { configureStore } from '@reduxjs/toolkit';
import conversationReducer from './conversationSlice';
import friendsReducer from './friendsSlice';
import dropMenuReducer from './dropMenuSlice';
import drawerReducer from './drawerSlice';
import contactPageReducer from './contactPageSlice';
import dynamicPageReducer from './dynamicPageSlice';
import profileReducer from './profileSlice';
import groupConversationReducer from './groupConversationSlice';

export const store = configureStore({
  reducer: {
    conversation: conversationReducer,
    friends: friendsReducer,
    dropMenu: dropMenuReducer,
    drawer: drawerReducer,
    contactPage: contactPageReducer,
    dynamicPage: dynamicPageReducer,
    profile: profileReducer,
    groupConversation: groupConversationReducer,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
