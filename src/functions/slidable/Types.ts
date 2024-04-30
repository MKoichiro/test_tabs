import { ReactNode } from 'react';

// - SLIDABLE_LENGTH:             [px]
//      スライドさせる距離 = 「スライドで現れるコンテンツの幅」を指定
// - GRADIENT_THRESHOLD:           [-]
//      開閉を実施する際の傾き（絶対値）の閾値
// - TOGGLE_THRESHOLD:            [px]
//      （"変位"を指で最初に触れた位置を始点として）
//      開閉を実施する変位の閾値（これと指が離れた時の変位を比較して開閉を判定）
//      "- SLIDABLE_LENGTH/2" などのように指定すると、スライド幅の半分で開閉を切り替える
// - COMPLEMENT_ANIME_DURATION:   [ms]
//      開閉時のアニメーション時間（指が離れた後、終状態まで補完する時）

export interface SlidableParamsType {
    SLIDABLE_LENGTH: number;
    GRADIENT_THRESHOLD: number;
    TOGGLE_THRESHOLD: number;
    COMPLEMENT_ANIME_DURATION: number;
}

// common
interface SlidableBaseType {
    children: ReactNode;
    className?: string;
}
// each
export interface SlidableType extends SlidableBaseType {
    slidableParams: SlidableParamsType;
}
export interface SlidableMainType extends SlidableBaseType {}
export interface SlidableHiddenType extends SlidableBaseType {
    slidableLength: number;
}
