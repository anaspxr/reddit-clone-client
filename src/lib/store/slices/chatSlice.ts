import { createSlice } from "@reduxjs/toolkit";

export type Message = {
  _id: string;
  sender: string;
  receiver: string;
  message: string;
  createdAt: string;
};

interface ChatState {
  people: {
    username: string;
    avatar: string;
    displayName: string;
  }[];
  messages: Message[];
}

const initialState: ChatState = {
  people: [],
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setPeople(state, action: { payload: ChatState["people"] }) {
      state.people = action.payload;
    },
    addPerson(state, action: { payload: ChatState["people"][0] }) {
      if (
        !state.people.find(
          (person) => person.username === action.payload.username
        )
      )
        state.people.push(action.payload);
    },
    setMessages(state, action: { payload: ChatState["messages"] }) {
      state.messages = action.payload;
    },
    addMessage(state, action: { payload: ChatState["messages"][0] }) {
      state.messages.push(action.payload);
    },
  },
});

export const { setPeople, addMessage, addPerson, setMessages } =
  chatSlice.actions;
export default chatSlice.reducer;
