import { getFriendList } from '@/utils/api';
import { User } from '@/utils/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

export interface FriendsState {
  friends: User[];
  loading: boolean;
}

const initialState: FriendsState = {
  friends: [],
  loading: false,
};

export const fetchFriendsThunk = createAsyncThunk(
  'friends/fetch',
  (_, payloadCreator) => {
    const friends = (payloadCreator.getState() as RootState).friends;
    // if the friends list is already existed. Abort sending request
    if (friends.friends.length) return Promise.reject();
    return getFriendList();
  }
);

export const friendSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFriendsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFriendsThunk.fulfilled, (state, action) => {
        state.loading = false;
        console.log('request fulfilled');
        state.friends = action.payload!.data;
      });
  },
});

export default friendSlice.reducer;
