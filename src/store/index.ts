import { configureStore } from '@reduxjs/toolkit';
import conversationReducer from './conversationSlice';
import friendsReducer from './friendsSlice';
import dropMenuReducer from './dropMenuSlice';
import drawerReducer from './drawerSlice';
import contactPageReducer from './contactPageSlice';

export const store = configureStore({
  reducer: {
    conversation: conversationReducer,
    friends: friendsReducer,
    dropMenu: dropMenuReducer,
    drawer: drawerReducer,
    contactPage: contactPageReducer,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
