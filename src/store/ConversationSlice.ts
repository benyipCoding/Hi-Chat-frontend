import {
  getMessagesByConversation,
  getMessagesByGroupConvId,
  getUnreadGroupMessageByUserId,
} from '@/utils/api';
import { Conversation, GroupConversation, Message } from '@/utils/types';
import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '.';

interface ConversationState {
  conversations: Conversation[];
  loading: boolean;
  currentConversation: Conversation | GroupConversation | null;
  isShowEmojiPicker: boolean;
  messages: Message[];
  unReadMessages: Message[];
  isGroup: boolean;
  unReadGroupMessages: Message[];
}

const initialState: ConversationState = {
  conversations: [],
  loading: false,
  currentConversation: null,
  isShowEmojiPicker: false,
  messages: [],
  unReadMessages: [],
  isGroup: false,
  unReadGroupMessages: [],
};

export const fetchMessagesThunk = createAsyncThunk(
  'fetch/messagesByConvId',
  (convId: number) => {
    return getMessagesByConversation(convId);
  }
);

export const fetchGroupMessagesThunk = createAsyncThunk(
  'fetch/group-messagesByGroupConvId',
  (groupConvId: number) => {
    return getMessagesByGroupConvId(groupConvId);
  }
);

export const fetchUnReadGroupMessagesThunk = createAsyncThunk(
  'fetch/unread-group-messages',
  () => {
    return getUnreadGroupMessageByUserId();
  }
);

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setCurrentConversation(
      state,
      action: PayloadAction<Conversation | GroupConversation>
    ) {
      state.currentConversation = action.payload;
    },
    toggleEmojiPickerVisible(state, action: PayloadAction<boolean>) {
      state.isShowEmojiPicker = action.payload;
    },
    updateMessagesBySelf(state, action: PayloadAction<Message>) {
      state.messages = state.messages.concat([action.payload]);
    },
    clearCurrentConversation(state) {
      state.currentConversation = null;
    },
    setConversations(state, action: PayloadAction<Conversation[]>) {
      state.conversations = action.payload;
    },
    setUnreadCountForConversations(
      state,
      action: PayloadAction<Record<number, number>>
    ) {
      const keys = Object.keys(action.payload);
      if (!keys.length) return;
      for (const key of keys) {
        const conversation = state.conversations.find(
          (conv) => conv.id === +key
        );
        if (!conversation) continue;
        conversation.unReadCount = action.payload[+key];
      }
    },
    setIsGroup(state, action: PayloadAction<boolean>) {
      state.isGroup = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMessagesThunk.fulfilled, (state, action) => {
        state.messages = action.payload.data.reverse();
      })
      .addCase(fetchGroupMessagesThunk.fulfilled, (state, action) => {
        state.messages = action.payload.data.reverse();
      })
      .addCase(fetchUnReadGroupMessagesThunk.fulfilled, (state, action) => {
        console.log(action.payload.data);
        state.unReadGroupMessages = action.payload.data;
      });
  },
});

const selectConversations = (state: RootState) =>
  state.conversation.conversations;
const selectConvName = (_state: RootState, name: string) => name;

export const selectConversationsByConvName = createSelector(
  [selectConvName, selectConversations],
  (name, conversations) =>
    conversations.filter(
      (conv) =>
        conv.name?.includes(name) || conv.name?.includes(name.toLowerCase())
    )
);

export const {
  setCurrentConversation,
  toggleEmojiPickerVisible,
  updateMessagesBySelf,
  clearCurrentConversation,
  setConversations,
  setUnreadCountForConversations,
  setIsGroup,
} = conversationSlice.actions;

export default conversationSlice.reducer;
