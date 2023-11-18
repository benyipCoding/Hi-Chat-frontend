import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DropMenuList, DropMenuType } from './dropMenuList';

export interface DropMenuState {
  isOpen: boolean;
  menuButtonX: number;
  menuButtonY: number;
  dropMenuList: DropMenuType[];
}

const initialState: DropMenuState = {
  isOpen: false,
  menuButtonX: 0,
  menuButtonY: 0,
  dropMenuList: DropMenuList,
};

export const dropMenuSlice = createSlice({
  name: 'dropMenu',
  initialState,
  reducers: {
    toggle(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
    setPosition(state, action: PayloadAction<{ x: number; y: number }>) {
      state.menuButtonX = action.payload.x;
      state.menuButtonY = action.payload.y;
    },
  },
});

export const { toggle, setPosition } = dropMenuSlice.actions;

export default dropMenuSlice.reducer;
