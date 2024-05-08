// import { ReactNode } from 'react';



/**
 * for hooks args
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
export interface SlidableParams {
    SLIDABLE_LENGTH: number;
    GRADIENT_THRESHOLD?: number;
    TOGGLE_THRESHOLD?: number;
    COMPLEMENT_ANIME_DURATION?: number;
    SLIDABLE_PLAY?: number;
}

/**
 * for hooks args
 * - when define default values
 */
export type SlidableParamsOptionalDefault = Required<Omit<SlidableParams, 'SLIDABLE_LENGTH' | 'TOGGLE_THRESHOLD'>>;


/**
 * for component props
 * - common
 */
interface PropsBase {
    // children: ReactNode;
    className?: string;
}

/**
 * for component props
 * - Slidable component
 */
export interface SlidableProps extends PropsBase {
    slidableParams: SlidableParams;
}

/**
 * for component props
 * - SlidableMain component
 */
export type SlidableMainProps = PropsBase;

/**
 * for component props
 * - SlidableHidden component
 */
export interface SlidableHiddenProps extends PropsBase {
    slidableLength: number;
}