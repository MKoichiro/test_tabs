import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BREAK_POINTS, CardCarouselMagic, DeviceUnion, cardCarouselMagics } from "../../../../data/styleMagics";


interface WindowSizeState {
  inner: {
    width: number;
    height: number;
  },
  client: {
    width: number;
    height: number;
  },
  device?: DeviceUnion;
  cardCarouselStyleFactors: CardCarouselMagic;
}
type WindowSizePayload = Omit<WindowSizeState, 'device' | 'cardCarouselStyleFactors'>;


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
  },
  device: undefined,
  cardCarouselStyleFactors: {
    gap_vw: 0,
    activeWidth_vw: 0,
    inactiveMagnification: 0
  }
};


const windowSizeSlice = createSlice({
  name: "windowSize",
  initialState,
  reducers: {
    setWindowSize: (state, action: PayloadAction<WindowSizePayload>) => {
      const { inner, client } = action.payload;
      state.inner = inner;
      state.client = client;

      let device: DeviceUnion;
      let cardCarouselStyleFactors: CardCarouselMagic;
      if (inner.width > BREAK_POINTS.pc) {
        device = "pc";
        cardCarouselStyleFactors = cardCarouselMagics.pc;
      } else if (inner.width > BREAK_POINTS.tb) {
        device = "tb";
        cardCarouselStyleFactors = cardCarouselMagics.tb;
      } else {
        device = "sp";
        cardCarouselStyleFactors = cardCarouselMagics.sp;
      }
      state.device = device;
      state.cardCarouselStyleFactors = cardCarouselStyleFactors;
    }
  }
});

export const { setWindowSize } = windowSizeSlice.actions;

export default windowSizeSlice.reducer;