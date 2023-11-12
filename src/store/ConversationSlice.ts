import { Conversation } from '@/utils/types';
import { createSlice } from '@reduxjs/toolkit';

interface ConversationState {
  conversations: Conversation[];
  loading: boolean;
}

const initialState: ConversationState = {
  conversations: [],
  loading: false,
};

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {},
});

export default conversationSlice.reducer;
