import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DropMenuList, DropMenuType } from './dropMenuList';

export interface DropMenuState {
  isOpen: boolean;
  menuButtonX: number;
  menuButtonY: number;
  dropMenuList: DropMenuType[];
  extraVisible: boolean;
  extraX: number;
  extraY: number;
  customModalVisible: boolean;
  modalInput: string;
  currentGroupConvId: number;
  isRename: boolean;
}

const initialState: DropMenuState = {
  isOpen: false,
  menuButtonX: 0,
  menuButtonY: 0,
  dropMenuList: DropMenuList,
  extraVisible: false,
  extraX: 0,
  extraY: 0,
  customModalVisible: false,
  modalInput: '',
  currentGroupConvId: 0,
  isRename: true,
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
    setExtraVisible(state, action: PayloadAction<boolean>) {
      state.extraVisible = action.payload;
    },
    setExtraPosition(state, action: PayloadAction<{ x: number; y: number }>) {
      state.extraX = action.payload.x;
      state.extraY = action.payload.y;
    },
    setCustomModalVisible(state, action: PayloadAction<boolean>) {
      state.customModalVisible = action.payload;
    },
    setModalInput(state, action: PayloadAction<string>) {
      state.modalInput = action.payload;
    },
    setCurrentGroupConvId(state, action: PayloadAction<number>) {
      state.currentGroupConvId = action.payload;
    },
    setIsRename(state, action: PayloadAction<boolean>) {
      state.isRename = action.payload;
    },
  },
});

export const {
  toggle,
  setPosition,
  setExtraVisible,
  setExtraPosition,
  setCustomModalVisible,
  setModalInput,
  setCurrentGroupConvId,
  setIsRename,
} = dropMenuSlice.actions;

export default dropMenuSlice.reducer;
