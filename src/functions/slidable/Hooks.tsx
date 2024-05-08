import React, { useRef, useState, useEffect, CSSProperties, useCallback } from 'react';
import { SlidableParams } from './types';
import { applyStyles, removeStyles } from './utils';
import { defaultValForOptionalParams } from './constants';
import { useWindowSize } from '../../providers/redux/slices/window_size_slice/hook';



export const useSlidable = (params: SlidableParams) => {

    const {
        SLIDABLE_LENGTH, // ← これだけ必須で受け取る、以下はoptionalなのでデフォルト値を設定
        GRADIENT_THRESHOLD = defaultValForOptionalParams.GRADIENT_THRESHOLD,
        TOGGLE_THRESHOLD = SLIDABLE_LENGTH / 2,
        COMPLEMENT_ANIME_DURATION = defaultValForOptionalParams.COMPLEMENT_ANIME_DURATION,
        SLIDABLE_PLAY = defaultValForOptionalParams.SLIDABLE_PLAY,
    } = params;

    const { inner, client } = useWindowSize(); // selector から取得


    const containerRef = useRef<HTMLDivElement | null>(null);
    // scrollBarWidthはrendering間で保持しつつ、resize時に更新。
    const scrollBarWidthRef = useRef<number>(inner.width - client.width);
    useEffect(() => { scrollBarWidthRef.current = inner.width - client.width }, [inner.width, client.width]);

    const [startPosition, setStartPosition] = useState<{x: number | undefined; y: number | undefined}>({ x: undefined, y: undefined });
    const [scrollY, setScrollY] = useState<number | undefined>(0);
    const [translateX, setTranslateX] = useState(0);
    const [isSlided, setIsSlided] = useState(false);
    const [isRejected, setIsRejected] = useState(false);
    const [isAllowed, setIsAllowed] = useState(false);

    /**
     * helper function
     * アニメーションを一時的に有効化して、開閉の終状態まで補完。補完後はアニメーションを再度無効化。
     * ※ 常時アニメーションを有効化していると、touchmove の度にアニメーションが発生してしまうので必要。
     */
    const enableAnimation = useCallback(() => {
        const container = containerRef.current;
        if (!container) return;
        container.style.transition = `transform ${COMPLEMENT_ANIME_DURATION}ms`;
        setTimeout(() => {
            container.style.transition = 'none';
        }, COMPLEMENT_ANIME_DURATION);
    }, [COMPLEMENT_ANIME_DURATION]);


    // --- Event Handlers: bind to <Slidable> ----------------- //
    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        // touch 開始時の各種座標を記録
        const touch = e.touches[0];
        setStartPosition({ x: touch.clientX, y: touch.clientY });
        setScrollY(window.scrollY);
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLElement>) => {
        // null check
        if (!startPosition.x || !startPosition.y) return;

        // スワイプ中、開始時からの座標差分を計算
        const touch = e.touches[0];
        const diffX = touch.clientX - startPosition.x;
        const diffY = touch.clientY - startPosition.y;

        // 指移動が SLIDABLE_PLAY[px] を超えるまでは reject/allow 判定とスライドをせずに return することで入射角に依存し過ぎないようにする
        if (Math.abs(diffX) < SLIDABLE_PLAY) return;

        // 初回で reject された一連の swipe 操作の場合は以降の slide 処理を行わない
        if (isRejected) return;

        // 初回のみの処理: 縦方向のスクロールかどうかの判定, 縦方向のスクロールの場合は reject
        const isFirstInvoke = !isAllowed && !isRejected;
        if (isFirstInvoke) {
            const gradient = Math.abs(Math.tan(diffY / diffX))
            if (gradient > GRADIENT_THRESHOLD) {
                // 傾きの絶対値が閾値を超えた場合は reject
                setIsRejected(true);
                return;
            }
            setIsAllowed(true);
            // 縦スクロールを禁止。スクロールバーが消える副作用があるので、その幅分だけ body を右にずらす。
            // spreadでも書けるが、styleのプロパティ量は大量なので丸ごとコピーするのは気持ちが悪い。
            const stylesForVerticalScrollBlock: CSSProperties = {
                paddingRight: `${scrollBarWidthRef.current}px`,
                position: 'fixed',
                width: '100%',
                top: `-${scrollY}px`,
            };
            applyStyles(stylesForVerticalScrollBlock);
        }

        // スライド実行（※実際は StyledContainer の transform プロパティに translateX を指定して移動）
        isSlided
            ? setTranslateX(diffX - SLIDABLE_LENGTH) // sliding to "Right" to "Close"
            : setTranslateX(diffX);                  // sliding to "Left"  to "Open"
    };

    /**
     * - (ちょうど指を離すことはまず無いけれど、)中途半端な位置で指を離した場合、最終的な開閉状態を決定し、アニメーションで補完する。
     * - 各種スタイルの初期化を行う。
     * - 各種stateの初期化を行う。
     */
    const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        // null check
        if (!startPosition.x || !startPosition.y) return;

        enableAnimation();

        // 開閉判定
        if (isAllowed) {
            const diffX = e.changedTouches[0].clientX - startPosition.x;
            if (diffX < - TOGGLE_THRESHOLD) {
                // Open Completely
                setTranslateX(-SLIDABLE_LENGTH);
                setIsSlided(true);
            } else {
                // Close Completely
                setTranslateX(0);
                setIsSlided(false);
            }

            // style の初期化
            removeStyles(['paddingRight', 'position', 'width', 'top']);
            if (scrollY) scrollTo(0, scrollY);
        }

        // 初期化
        setStartPosition({ x: undefined, y: undefined });
        setIsAllowed(false);
        setIsRejected(false);
        setScrollY(undefined);
    };
    // ------------------------------------- Event Handlers --- //

    // slide後にユーザーが別の場所を操作した場合、スライドを閉じる

    const resetSlidedState = useCallback((e: MouseEvent | TouchEvent) => {
        // iOSでうまく動作させるために、setTimeout で処理を遅延させる。遅延させても特に不自然では無い。
        setTimeout(() => {
            if (!isSlided) return;
            // コンテナ内での発火の場合はスライドを閉じない
            const invokedIn = (e.target as Element).closest('.slidable-container');
            if (invokedIn === containerRef.current) return;
            enableAnimation();
            setIsSlided(false);
            setTranslateX(0);
        }, 100);
    },[isSlided, enableAnimation]);

    useEffect(() => {
        if (!isSlided) return;

        // このイベントは、slideで表示されるボタンに付与されうるクリックイベントが発火したのちのバブリングフェーズでの発火となるので、
        // (問題なく、) resetSlidedState が実行される前に、ボタンのクリックイベントが発火する。
        // 例えばここで、clickイベントではなくmousedownイベントにresetSlidedStateをバインドすると、
        // ボタンのクリックイベントの方が後回しになり発火しない可能性があるので注意。
        // 追記: iOSに対応するためにresetSlidedState内をsetTimeoutでラップしているので、結局発火順はそんなにシビアに気にしなくても良い。
        document.addEventListener('click', resetSlidedState);
        // iOS 用の対応
        document.addEventListener('touchstart', resetSlidedState);

        return () => {
            document.removeEventListener('click', resetSlidedState);
            // iOS 用の対応
            document.removeEventListener('touchstart', resetSlidedState);

        };
    }, [isSlided]);

    return {
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        translateX,
        containerRef,
        isSlided,
    };
};