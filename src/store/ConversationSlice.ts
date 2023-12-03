import { Conversation } from '@/utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ConversationState {
  conversations: Conversation[];
  loading: boolean;
  currentConversation: Conversation | null;
}

const initialState: ConversationState = {
  conversations: [],
  loading: false,
  currentConversation: null,
};

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setCurrentConversation(state, action: PayloadAction<Conversation>) {
      state.currentConversation = action.payload;
    },
  },
});

export const { setCurrentConversation } = conversationSlice.actions;

export default conversationSlice.reducer;
