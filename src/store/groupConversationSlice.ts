import { getGroupConversations } from '@/utils/api';
import { GroupConversation } from '@/utils/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface GroupConversationState {
  groupConvList: GroupConversation[];
  loading: boolean;
}

const initialState: GroupConversationState = {
  groupConvList: [],
  loading: false,
};

export const fetchGroupConvList = createAsyncThunk('fetch/groups', () => {
  return getGroupConversations();
});

export const groupConversationSlice = createSlice({
  name: 'groupConversation',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchGroupConvList.fulfilled, (state, action) => {
      state.groupConvList = action.payload.data;
    });
  },
});

export default groupConversationSlice.reducer;
