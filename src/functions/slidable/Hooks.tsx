import { useRef, useState, TouchEvent } from 'react';
import { SlidableParamsType } from './Types';


export const useSlidable = (params: SlidableParamsType) => {
  const { SLIDABLE_LENGTH, GRADIENT_THRESHOLD, TOGGLE_THRESHOLD, COMPLEMENT_ANIME_DURATION } = params;

  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isSlided,        setIsSlided] = useState(false);
  const [translateX,    setTranslateX] = useState(0);
  const [startX,            setStartX] = useState<number | undefined>(undefined);
  const [startY,            setStartY] = useState<number | undefined>(undefined);

  // --- Event Handlers: bind to <Slidable> ----------------- //
  // --- touch "START" --- //
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    // touch 開始時の座標を記録
    const touch = e.touches[0];
    setStartX(touch.clientX);
    setStartY(touch.clientY);
  };


  // --- touch "MOVE" --- //
  let allowed: boolean = false, rejected: boolean = false;
  const handleTouchMove = (e: TouchEvent<HTMLElement>) => {
    // null check
    if (!startX || !startY) return;
    // 初回で reject された一連の swipe 操作の場合は以降の slide 処理を行わない
    if (rejected) return;

    // スワイプ中の座標差分を計算
    const touch = e.touches[0];
    const diffX = touch.clientX - startX;
    const diffY = touch.clientY - startY;

    // 初回のみの処理: 縦方向のスクロールかどうかの判定, 縦方向のスクロールの場合は reject
    const isFirstInvoke = !allowed && !rejected;
    if (isFirstInvoke) {
      const gradient = Math.abs(diffY / diffX);
      if (gradient > GRADIENT_THRESHOLD) { // 傾きの絶対値が閾値を超えた場合は reject
        rejected = true;
        return;
      }
      allowed = true;
    }

    // スライド実行（※実際は StyledContainer の transform プロパティに translateX を指定して移動）
    if (!isSlided) {                   setTranslateX(diffX) } // sliding to "Left"  to "Open"
    else           { setTranslateX(diffX - SLIDABLE_LENGTH) } // sliding to "Right" to "Close"
  };


  // --- touch "END" --- //
  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    // null check
    if (!startX || !startY || !containerRef.current) return;

    // アニメーションを一時的に有効化して、終状態まで補完
    containerRef.current.style.transition = `transform ${COMPLEMENT_ANIME_DURATION}ms`;
    setTimeout(() => {
      containerRef.current && (containerRef.current.style.transition = 'none');
    }, COMPLEMENT_ANIME_DURATION);

    // 開閉判定
    const diffX = e.changedTouches[0].clientX - startX;
    if (diffX < TOGGLE_THRESHOLD) {
      // 開く
      setTranslateX(-SLIDABLE_LENGTH);
      setIsSlided(true);
    } else {
      // 閉じる
      setTranslateX(0);
      setIsSlided(false);
    }

    // 初期化
    setStartX(undefined);
    setStartY(undefined);
    allowed = rejected = false;
  };
  // ------------------------------------- Event Handlers --- //


  return { handleTouchStart, handleTouchMove, handleTouchEnd, translateX, containerRef, isSlided };
};