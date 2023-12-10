import { getMessagesByConversation } from '@/utils/api';
import { Conversation, Message } from '@/utils/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ConversationState {
  conversations: Conversation[];
  loading: boolean;
  currentConversation: Conversation | null;
  isShowEmojiPicker: boolean;
  messages: Message[];
}

const initialState: ConversationState = {
  conversations: [],
  loading: false,
  currentConversation: null,
  isShowEmojiPicker: false,
  messages: [],
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
      if (!state.currentConversation) return;
      state.messages = state.messages.concat([action.payload]);
    },
    clearCurrentConversation(state) {
      state.currentConversation = null;
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
} = conversationSlice.actions;

export default conversationSlice.reducer;
