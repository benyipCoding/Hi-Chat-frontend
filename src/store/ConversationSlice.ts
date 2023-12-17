import { getMessagesByConversation } from '@/utils/api';
import { Conversation, Message } from '@/utils/types';
import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

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
      state.conversations = action.payload;
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

export const {
  setCurrentConversation,
  toggleEmojiPickerVisible,
  updateMessagesBySelf,
  clearCurrentConversation,
  setConversations,
  setUnreadCountForConversations,
} = conversationSlice.actions;

export default conversationSlice.reducer;
