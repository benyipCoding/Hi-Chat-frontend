import { User } from '@/utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
  targetUser: User | null;
  profileModalVisible: boolean;
  modalTitle: string;
}

const initialState: ProfileState = {
  targetUser: null,
  profileModalVisible: false,
  modalTitle: '',
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setTargetUser(state, action: PayloadAction<User>) {
      state.targetUser = action.payload;
    },
    toggleProfileModalVisible(state, action: PayloadAction<boolean>) {
      state.profileModalVisible = action.payload;
    },
    setModalTitle(state, action: PayloadAction<string>) {
      state.modalTitle = action.payload;
    },
  },
});

export const { setTargetUser, toggleProfileModalVisible, setModalTitle } =
  profileSlice.actions;

export default profileSlice.reducer;
