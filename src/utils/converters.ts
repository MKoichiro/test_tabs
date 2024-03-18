import { $contentsWidth } from "../data/styleMagics";

export const convertRemToPx = (remValue: number): number => {
  let pxValue: number;
  if (innerWidth > 1024) {
    pxValue = remValue * (10 * 1.00);
  } else if (innerWidth > 600) {
    pxValue = remValue * (10 * 0.50);
  } else {
    pxValue = remValue * (10 * 0.35);
  }
  return pxValue;
};

export const getCurrentContentsVw = (): number => {
  switch (true) {
    case (1024 < innerWidth):
      return $contentsWidth.pc;
    case (600 < innerWidth && innerWidth <= 1024):
      return $contentsWidth.tb;
    default:
      return $contentsWidth.sp;
  }
};

export const convertVwToPx = (vwValue: number): number => {
  return innerWidth * (vwValue / 100);
};