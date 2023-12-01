import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ContactPageState {
  defaultActiveKey: string[];
}

const initialState: ContactPageState = {
  defaultActiveKey: [],
};

const contactPageSlice = createSlice({
  name: 'contactPage',
  initialState,
  reducers: {
    setDefaultActiveKey(state, active: PayloadAction<string[]>) {
      state.defaultActiveKey = active.payload;
    },
  },
});

export const { setDefaultActiveKey } = contactPageSlice.actions;

export default contactPageSlice.reducer;
