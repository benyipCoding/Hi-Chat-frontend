import { getFriendList, getInvitations, getStrangerList } from '@/utils/api';
import { Invitation, User, UserWithChecked } from '@/utils/types';
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
  invitations: Invitation[];
}

const initialState: FriendsState = {
  friends: [],
  loading: false,
  strangers: [],
  invitations: [],
};

export const fetchFriendsThunk = createAsyncThunk('friends/fetch', () => {
  return getFriendList();
});

export const fetchStrangersThunk = createAsyncThunk('strangers/fetch', () => {
  return getStrangerList().then((res) =>
    res.data.map((u) => ({ ...u, checked: false }))
  );
});

export const fetchInvitationsThunk = createAsyncThunk(
  'invitations/fetch',
  () => {
    return getInvitations();
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
    addInvitationsRecord(state, action: PayloadAction<Invitation>) {
      state.invitations.unshift(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      // .addCase(fetchFriendsThunk.pending, (state) => {
      //   state.loading = true;
      // })
      .addCase(fetchFriendsThunk.fulfilled, (state, action) => {
        // state.loading = false;
        console.log('request fulfilled');
        state.friends = action.payload!.data;
      })
      // .addCase(fetchStrangersThunk.pending, (state) => {
      //   state.loading = true;
      // })
      .addCase(fetchStrangersThunk.fulfilled, (state, action) => {
        // state.loading = false;
        console.log('fetch strangers fulfilled');
        state.strangers = action.payload;
      })
      .addCase(fetchInvitationsThunk.fulfilled, (state, action) => {
        console.log('fetchInvitationsThunk fulfilled');
        state.invitations = action.payload.data;
      });
  },
});

const selectStrangerName = (_state: RootState, inputVal: string) => inputVal;
const selectStrangers = (state: RootState) => state.friends.strangers;

export const selectStrangerByName = createSelector(
  [selectStrangerName, selectStrangers],
  (name, strangers) => strangers.filter((s) => s?.name.includes(name))
);

export const { toggleStrangerChecked, allOrNone, addInvitationsRecord } =
  friendSlice.actions;

export default friendSlice.reducer;
