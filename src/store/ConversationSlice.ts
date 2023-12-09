import { Conversation } from '@/utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ConversationState {
  conversations: Conversation[];
  loading: boolean;
  currentConversation: Conversation | null;
  isShowEmojiPicker: boolean;
}

const initialState: ConversationState = {
  conversations: [],
  loading: false,
  currentConversation: null,
  isShowEmojiPicker: false,
};

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
  },
});

export const { setCurrentConversation, toggleEmojiPickerVisible } =
  conversationSlice.actions;

export default conversationSlice.reducer;
