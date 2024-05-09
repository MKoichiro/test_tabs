// const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

// export const convertRemToPx = (remValue: number, baseFontSize = rootFontSize): number => {
//     let pxValue: number;
//     if (innerWidth > 1024) {
//         pxValue = remValue * baseFontSize * (62.5 / 100);
//     } else if (innerWidth > 600) {
//         pxValue = remValue * baseFontSize * (50.0 / 100);
//     } else {
//         pxValue = remValue * baseFontSize * (35.0 / 100);
//     }
//     return pxValue;
// };


export const vw2px = (vw: number): number => {
    return innerWidth * (vw / 100);
};