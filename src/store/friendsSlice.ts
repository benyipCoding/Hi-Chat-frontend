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
  untreatedCount: number;
  friendListBadge: number;
}

const initialState: FriendsState = {
  friends: [],
  loading: false,
  strangers: [],
  invitations: [],
  untreatedCount: 0,
  friendListBadge: 0,
};

export const fetchFriendsThunk = createAsyncThunk('friends/fetch', () => {
  return getFriendList().then((res) =>
    res.data.map((f) => ({ ...f, groupSelected: false }))
  );
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
    setUntreatedCount(state, action: PayloadAction<number>) {
      state.untreatedCount = action.payload;
    },
    clearFriendListBadge(state) {
      state.friendListBadge = 0;
    },
    setFriendListBadge(state, action: PayloadAction<number>) {
      state.friendListBadge = action.payload < 0 ? 0 : action.payload;
    },
    setFriendGroupSelected(
      state,
      action: PayloadAction<{ targetUser: User; groupSelected: boolean }>
    ) {
      const target = state.friends.find(
        (f) => f.id === action.payload.targetUser.id
      );
      if (!target) throw new Error('TargetUser is missing!');
      target.groupSelected = action.payload.groupSelected;
    },
    groupAllOrNone(state) {
      const hasFalseItem = state.friends.some((f) => !f.groupSelected);
      if (hasFalseItem) {
        state.friends.forEach((f) => (f.groupSelected = true));
      } else {
        state.friends.forEach((f) => (f.groupSelected = false));
      }
    },
    clearGroupSelected(state) {
      state.friends.forEach((f) => (f.groupSelected = false));
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFriendsThunk.fulfilled, (state, action) => {
        state.friends = action.payload!;
      })
      .addCase(fetchStrangersThunk.fulfilled, (state, action) => {
        state.strangers = action.payload;
      })
      .addCase(fetchInvitationsThunk.fulfilled, (state, action) => {
        state.invitations = action.payload.data;
      });
  },
});

const selectUserName = (_state: RootState, inputVal: string) => inputVal;
const selectStrangers = (state: RootState) => state.friends.strangers;
const selectFriends = (state: RootState) => state.friends.friends;
const selectInvitations = (state: RootState) => state.friends.invitations;

export const selectStrangerByName = createSelector(
  [selectUserName, selectStrangers],
  (name, strangers) =>
    strangers.filter(
      (s) =>
        s?.displayName.includes(name) ||
        s.displayName.includes(name.toLowerCase())
    )
);
export const selectFriendByName = createSelector(
  [selectUserName, selectFriends],
  (name, friends) =>
    friends.filter(
      (f) =>
        f.nickname?.includes(name) ||
        f.nickname?.includes(name.toLowerCase()) ||
        f.displayName.includes(name) ||
        f.displayName.includes(name.toLowerCase())
    )
);
export const selectInvitationByName = createSelector(
  [selectUserName, selectInvitations],
  (name, strangers) =>
    strangers.filter(
      (i) =>
        i.sender.displayName.includes(name) ||
        i.sender.displayName.includes(name.toLowerCase()) ||
        i.receiver.displayName.includes(name) ||
        i.receiver.displayName.includes(name.toLowerCase())
    )
);

export const {
  toggleStrangerChecked,
  allOrNone,
  addInvitationsRecord,
  setUntreatedCount,
  clearFriendListBadge,
  setFriendListBadge,
  setFriendGroupSelected,
  groupAllOrNone,
  clearGroupSelected,
} = friendSlice.actions;

export default friendSlice.reducer;
