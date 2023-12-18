import { getMessagesByConversation } from '@/utils/api';
import { USER_NAME } from '@/utils/helpers';
import { Conversation, Message } from '@/utils/types';
import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '.';

interface ConversationState {
  conversations: Conversation[];
  loading: boolean;
  currentConversation: Conversation | null;
  isShowEmojiPicker: boolean;
  messages: Message[];
  unReadMessages: Message[];
}

const initialState: ConversationState = {
  conversations: [],
  loading: false,
  currentConversation: null,
  isShowEmojiPicker: false,
  messages: [],
  unReadMessages: [],
};

export const fetchMessagesThunk = createAsyncThunk(
  'fetch/messagesByConvId',
  (convId: number) => {
    return getMessagesByConversation(convId);
  }
);

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setCurrentConversation(state, action: PayloadAction<Conversation>) {
      state.currentConversation = action.payload;
    },
    toggleEmojiPickerVisible(state, action: PayloadAction<boolean>) {
      state.isShowEmojiPicker = action.payload;
    },
    updateMessagesBySelf(state, action: PayloadAction<Message>) {
      state.messages = state.messages.concat([action.payload]);
    },
    clearCurrentConversation(state) {
      state.currentConversation = null;
    },
    setConversations(state, action: PayloadAction<Conversation[]>) {
      const username = localStorage.getItem(USER_NAME);
      state.conversations = action.payload.map((conv) => ({
        ...conv,
        name:
          conv.creator.name === username
            ? conv.recipient.name
            : conv.creator.name,
      }));
    },
    setUnreadCountForConversations(
      state,
      action: PayloadAction<Record<number, number>>
    ) {
      const keys = Object.keys(action.payload);
      if (!keys.length) return;
      for (const key of keys) {
        const conversation = state.conversations.find(
          (conv) => conv.id === +key
        );
        if (!conversation) continue;
        conversation.unReadCount = action.payload[+key];
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchMessagesThunk.fulfilled, (state, action) => {
      state.messages = action.payload.data.reverse();
    });
  },
});

const selectConversations = (state: RootState) =>
  state.conversation.conversations;
const selectConvName = (_state: RootState, name: string) => name;

export const selectConversationsByConvName = createSelector(
  [selectConvName, selectConversations],
  (name, conversations) =>
    conversations.filter((conv) => conv.name?.includes(name))
);

export const {
  setCurrentConversation,
  toggleEmojiPickerVisible,
  updateMessagesBySelf,
  clearCurrentConversation,
  setConversations,
  setUnreadCountForConversations,
} = conversationSlice.actions;

export default conversationSlice.reducer;
