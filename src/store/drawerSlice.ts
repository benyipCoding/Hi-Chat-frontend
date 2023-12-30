import { DropMenuAction } from '@/utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DrawerState {
  visible: boolean;
  drawerTitle: DropMenuAction;
}

const initialState: DrawerState = {
  visible: false,
  drawerTitle: DropMenuAction.ADD_FRIENDS,
};

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    toggleVisible(state, action: PayloadAction<boolean>) {
      state.visible = action.payload;
    },
    setDrawerTitle(state, action: PayloadAction<DropMenuAction>) {
      state.drawerTitle = action.payload;
    },
  },
});

export const { toggleVisible, setDrawerTitle } = drawerSlice.actions;

export default drawerSlice.reducer;
