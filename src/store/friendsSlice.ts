import { getFriendList, getStrangerList } from '@/utils/api';
import { User, UserWithChecked } from '@/utils/types';
import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '.';

export interface FriendsState {
  friends: User[];
  loading: boolean;
  strangers: UserWithChecked[];
}

const initialState: FriendsState = {
  friends: [],
  loading: false,
  strangers: [],
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

export const fetchStrangersThunk = createAsyncThunk(
  'strangers/fetch',
  async () => {
    return getStrangerList().then((res) =>
      res.data.map((u) => ({ ...u, checked: false }))
    );
  }
);

export const friendSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    toggleStrangerChecked(state, action: PayloadAction<UserWithChecked>) {
      const target = state.strangers.find((u) => u.id === action.payload.id);
      target!.checked = !target?.checked;
    },
    allOrNone(state) {
      const hasFalseItem = state.strangers.some((u) => !u.checked);
      if (hasFalseItem) {
        state.strangers.forEach((u) => (u.checked = true));
      } else {
        state.strangers.forEach((u) => (u.checked = false));
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFriendsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFriendsThunk.fulfilled, (state, action) => {
        state.loading = false;
        console.log('request fulfilled');
        state.friends = action.payload!.data;
      })
      .addCase(fetchStrangersThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStrangersThunk.fulfilled, (state, action) => {
        state.loading = false;
        console.log('fetch strangers fulfilled');
        state.strangers = action.payload;
      });
  },
});

const selectStrangerName = (_state: RootState, inputVal: string) => inputVal;
const selectStrangers = (state: RootState) => state.friends.strangers;

export const selectStrangerByName = createSelector(
  [selectStrangerName, selectStrangers],
  (name, strangers) => strangers.filter((s) => s?.name.includes(name))
);

export const { toggleStrangerChecked, allOrNone } = friendSlice.actions;

export default friendSlice.reducer;
