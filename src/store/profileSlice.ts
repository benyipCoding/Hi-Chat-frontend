import { User } from '@/utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
  targetUser: User | null;
}

const initialState: ProfileState = {
  targetUser: null,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setTargetUser(state, action: PayloadAction<User>) {
      state.targetUser = action.payload;
    },
  },
});

export const { setTargetUser } = profileSlice.actions;

export default profileSlice.reducer;
