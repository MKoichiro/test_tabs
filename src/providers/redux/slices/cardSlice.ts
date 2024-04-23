import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface StateType {
  activeIdx: number;
}

const initialState: StateType = {
  activeIdx: 0,
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    setActiveIdx: (state, action: PayloadAction<number>) => {
      state.activeIdx = action.payload;
    },
  },
});

export const { setActiveIdx } = cardSlice.actions;

export default cardSlice.reducer;