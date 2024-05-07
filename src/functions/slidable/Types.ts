import { ReactNode } from 'react';

/**
 * @property SLIDABLE_LENGTH
 *     スライドさせる距離 = 「スライドで現れるコンテンツの幅」を指定
 * @property GRADIENT_THRESHOLD
 *    開閉を実施する際の傾き（絶対値）の閾値
 * @property TOGGLE_THRESHOLD
 *   （"変位"を指で最初に触れた位置を始点として）
 *  開閉を実施する変位の閾値（これと指が離れた時の変位を比較して開閉を判定）
 * "- SLIDABLE_LENGTH/2" などのように指定すると、スライド幅の半分で開閉を切り替える
 * @property COMPLEMENT_ANIME_DURATION
 *   開閉時のアニメーション時間（指が離れた後、終状態まで補完する時）
 * @property SLIDABLE_PLAY
 *  スワイプ開始時に、実際にスライドするかを判定するまでの'遊び'の幅
 * この値を大きくすると、スライドが始まるまでの感覚が大きくなる一方で、スライド可否の判定が正確になる(入射角に依存しにくくなる)
 */
export interface SlidableParamsType {
    SLIDABLE_LENGTH: number;
    GRADIENT_THRESHOLD: number;
    TOGGLE_THRESHOLD: number;
    COMPLEMENT_ANIME_DURATION: number;
    SLIDABLE_PLAY: number;
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
