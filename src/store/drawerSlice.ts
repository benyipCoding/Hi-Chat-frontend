import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DrawerState {
  visible: boolean;
}

const initialState: DrawerState = {
  visible: false,
};

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    toggleVisible(state, action: PayloadAction<boolean>) {
      state.visible = action.payload;
    },
  },
});

export const { toggleVisible } = drawerSlice.actions;

export default drawerSlice.reducer;
