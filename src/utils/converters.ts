import { $contentsWidth } from '../data/styleMagics';

const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

export const convertRemToPx = (remValue: number, baseFontSize = rootFontSize): number => {
    let pxValue: number;
    if (innerWidth > 1024) {
        pxValue = remValue * baseFontSize * (62.5 / 100);
    } else if (innerWidth > 600) {
        pxValue = remValue * baseFontSize * (50.0 / 100);
    } else {
        pxValue = remValue * baseFontSize * (35.0 / 100);
    }
    return pxValue;
};

export const getCurrentContentsVw = (): number => {
    switch (true) {
        case 1024 < innerWidth:
            return $contentsWidth.pc;
        case 600 < innerWidth && innerWidth <= 1024:
            return $contentsWidth.tb;
        default:
            return $contentsWidth.sp;
    }
};

export const vw2px = (vw: number): number => {
    return innerWidth * (vw / 100);
};
