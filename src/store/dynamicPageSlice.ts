import { DynamicPageName } from '@/components/DynamicPage/pageMap';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DynamicPageState {
  currentPage: DynamicPageName;
  title: string;
}

const initialState: DynamicPageState = {
  currentPage: DynamicPageName.CONVERSATION,
  title: '',
};

const dynamicPageSlice = createSlice({
  name: 'dynamicPage',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<DynamicPageName>) {
      state.currentPage = action.payload;
    },
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
  },
});

export const { setCurrentPage, setTitle } = dynamicPageSlice.actions;

export default dynamicPageSlice.reducer;
