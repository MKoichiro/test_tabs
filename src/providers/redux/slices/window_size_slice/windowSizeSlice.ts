// resizeをトリガーにdispatchされるwindowSizeのstateを更新するslice
// window sizeに強く依存するstyleの内jsからも頻繁に参照される値を保持する
// なお、window sizeに依存するstyleでもjsからの参照が無いものはシンプルにcssのメディアクエリで対応する

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BREAK_POINTS, CardCarouselMagic, DeviceUnion, cardCarouselMagics, contentsWidths, fontSizeRatios } from "../../../../data/styleMagics";


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
  fontSizeRatio: number;
  contentsWidth: number;
  cardCarouselStyleFactors: CardCarouselMagic;
}
type WindowSizePayload = Pick<WindowSizeState, 'inner' | 'client'>;


// inner, clientの実際の初期値はApp.tsxで設定
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
  fontSizeRatio: 0,
  contentsWidth: 0,
  cardCarouselStyleFactors: {
    gap_vw: 0,
    activeWidth_vw: 0,
    inactiveMagnification: 0
  },
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
      let fontSizeRatio: number;
      let contentsWidth: number;
      let cardCarouselStyleFactors: CardCarouselMagic;

      if (inner.width > BREAK_POINTS.pc) {
        device = "pc";
        fontSizeRatio = fontSizeRatios.pc;
        contentsWidth = contentsWidths.pc;
        cardCarouselStyleFactors = cardCarouselMagics.pc;
      } else if (inner.width > BREAK_POINTS.tb) {
        device = "tb";
        fontSizeRatio = fontSizeRatios.tb;
        contentsWidth = contentsWidths.tb;
        cardCarouselStyleFactors = cardCarouselMagics.tb;
      } else {
        device = "sp";
        fontSizeRatio = fontSizeRatios.sp;
        contentsWidth = contentsWidths.sp;
        cardCarouselStyleFactors = cardCarouselMagics.sp;
      }
      state.device = device;
      state.fontSizeRatio = fontSizeRatio;
      state.contentsWidth = contentsWidth;
      state.cardCarouselStyleFactors = cardCarouselStyleFactors;
    }
  }
});

export const { setWindowSize } = windowSizeSlice.actions;

export default windowSizeSlice.reducer;

// styleMagics.tsにマッピングがあるので、deviceのみをstateに保持すれば良いと思った件
// 例えば、deviceの更新で、const cardCarouselStyleFactors = cardCarouselMagics[device]などと定義した値は確かに更新されるが、
// この値を参照するコンポーネントや関数はレンダリング、更新がされないので、手動で何らかの処理を追加でコンポーネントや関数に書く必要が出てくる。
// このように、各コンポーネントや関数が煩雑かつ汚染されるのを防ぐために、愚直にすべてstateに保持することに決心。