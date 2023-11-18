import { configureStore } from '@reduxjs/toolkit';
// import conversationReducer from './conversationSlice';
import friendsReducer from './friendsSlice';
import dropMenuReducer from './dropMenuSlice';

export const store = configureStore({
  reducer: {
    // conversation: conversationReducer,
    friends: friendsReducer,
    dropMenu: dropMenuReducer,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
