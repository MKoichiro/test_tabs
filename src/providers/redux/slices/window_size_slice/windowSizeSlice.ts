import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface WindowSizeState {
  inner: {
    width: number;
    height: number;
  },
  client: {
    width: number;
    height: number;
  }
}

// 実際の初期値はApp.tsxで設定
// ここで設定してもレンダリング前なので正常な値が取れない(試してみると、innerとclientが全く同じになった。)
const initialState: WindowSizeState = {
  inner: {
    width: 0,
    height: 0
  },
  client: {
    width: 0,
    height: 0
  }
};


const windowSizeSlice = createSlice({
  name: "windowSize",
  initialState,
  reducers: {
    setWindowSize: (state, action: PayloadAction<WindowSizeState>) => {
      state.inner = action.payload.inner;
      state.client = action.payload.client;
    }
  }
});

export const { setWindowSize } = windowSizeSlice.actions;

export default windowSizeSlice.reducer;