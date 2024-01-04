import { getGroupConversations } from '@/utils/api';
import { GroupConversation } from '@/utils/types';
import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '.';

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

const selectGroupConvList = (state: RootState) =>
  state.groupConversation.groupConvList;
const selectGroupName = (_state: RootState, groupName: string) => groupName;

export const selectGroupConvListByGroupName = createSelector(
  [selectGroupName, selectGroupConvList],
  (groupName, groupConvList) =>
    groupConvList.filter((group) => group.name.includes(groupName))
);

export const groupConversationSlice = createSlice({
  name: 'groupConversation',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchGroupConvList.fulfilled, (state, action) => {
      state.groupConvList = action.payload.data;
      console.log('fetchGroupConvList.fulfilled', state.groupConvList);
    });
  },
});

export default groupConversationSlice.reducer;
