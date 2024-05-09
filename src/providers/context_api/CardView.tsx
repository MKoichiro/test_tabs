// 今後の課題
// - swipe でのスクロール
// - cardViewOpen での展開時にアニメーションを一時的に止める
// - 移動距離を算出するために必要なのは、styleFactorと、handleScroll。
//   よって、styleFactorとhandleScrollを分離できれば、純粋にcarouselのロジックだけを提供するproviderになる気がする。
//   他でも別種のカルーセルを使用するならば、修正を検討してもいいかもしれない。
//   追記: styleFactorsを引数で受け取るように変更。styleFactorsは、useWindowSizeSelectorで取得する。
//         これでひとまず、分離したが、本質的には、移動距離計算ロジックがhandleScroll内部で定義されているのが問題。
//         よって、移動距離計算ロジック部分は関数として引数で受け取るように変更するとcardView特有の処理を完全に外部化できるだろう。
//         これを経て、本モジュールは、純粋なカルーセルロジックのproviderにできる。

import React, {
    FC,
    MutableRefObject,
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import { vw2px } from '../../utils/converters';
import { CardCarouselMagic, cardCarouselMagics } from '../../data/styleMagics';
import { useModalOpener } from './ModalElmsRef';
import { modalNames } from '../../components/common/modal/settings';

import { useCardSelector, useDispatch, useWindowSizeSelector } from '../redux/store';
import { setActiveIdx } from '../redux/slices/cardSlice';

// === TYPE =========================================================== //
// - CONTEXT
interface ContextType {
    carouselContainerRef: MutableRefObject<HTMLUListElement | null> | null;
    handleScroll: (n: number, behavior: ScrollBehavior, styleFactors: CardCarouselMagic) => void;
}
// - PROVIDER
interface CardViewType {
    children: ReactNode;
}
// =========================================================== TYPE === //

// === CONTEXT ======================================================== //
const Context = createContext<ContextType>({
    carouselContainerRef: null,
    handleScroll: () => {},
});
// ======================================================== CONTEXT === //

// === PROVIDER ======================================================= //
export const CardView: FC<CardViewType> = (props) => {
    const { children } = props;

    // --- Management Items --------------------------------------- //
    // 1. refs: nodes
    const carouselContainerRef = useRef<HTMLUListElement | null>(null);
    // --------------------------------------- Management Items --- //


    // --- functions ---------------------------------------------- //
    const handleScroll = (n: number, behavior: ScrollBehavior, styleFactors: CardCarouselMagic) => {
        const { gap_vw, activeWidth_vw, inactiveMagnification } = styleFactors;
        const padding_vw = gap_vw * 2;
        const inactiveWidth_vw = activeWidth_vw * inactiveMagnification;

        // convert vw to px
        const gap = vw2px(gap_vw);
        const padding = vw2px(padding_vw);
        const inactiveWidth = vw2px(inactiveWidth_vw);

        // calculate Moving Distance [px]
        let Xn: number;
        switch (n) {
            case 0:
                Xn = 0;
                break;
            default:
                Xn = padding + (inactiveWidth + gap) * (n - 1) + (inactiveWidth - gap);
                break;
        }

        // execute scroll: modal は普段は非表示なので、css の適用を待つ意味で requestAnimationFrame を使用
        requestAnimationFrame(() => {
            if (!carouselContainerRef.current) {
                return;
            }
            carouselContainerRef.current.scrollTo({ left: Xn, behavior });
        });
    };
    // ---------------------------------------------- functions --- //

    // providing value
    const value = {
        carouselContainerRef,
        handleScroll,
    };

    return (
        <Context.Provider
            value={value}
            children={children}
        />
    );
};
// === PROVIDER ======================================================= //

// === HOOKS ========================================================== //
// 1. registerContainer: CardsCarousel で使用。carousel container となる ul 要素のコンポーネントで登録
export const useCardCarouselRegister = () => {
    const { carouselContainerRef } = useContext(Context);
    const { cardCarouselStyleFactors } = useWindowSizeSelector();

    const registerContainer =() => {

        return {
            adjustedPadding_vw: `0 ${cardCarouselStyleFactors.gap_vw * 2}vw`,
            carouselContainerRef,
        };
    };

    return { registerContainer };
};

// 2. useCardScroll: CardTodo で使用。card のスクロールを管理
export const useCardScroll = (idx: number) => {
    const [isActive, setIsActive] = useState(false);
    const { handleScroll } = useContext(Context);
    const { activeIdx } = useCardSelector();

    // 別の CardTodo で activeIdx が変更されたときに isActive を更新
    useEffect(() => {
        setIsActive(idx === activeIdx);
    }, [activeIdx]);

    return { handleScroll, isActive };
};

// 3. useCardViewOpen: ActiveTodo で使用。card view を開くボタンを含むコンポーネントで使用
export const useCardViewOpener = () => {
    const { handleScroll } = useContext(Context);
    const { device } = useWindowSizeSelector();
    const modalName = modalNames.cardCarousel;
    const dispatch = useDispatch();
    const openModal = useModalOpener(modalName);

    const cardViewOpen = useCallback((idx: number) => {
        if (!device) return;
        const cardCarouselStyleFactors = cardCarouselMagics[device];

        // idx 番目の card で modal を開く
        openModal();
        dispatch(setActiveIdx(idx));
        // 'instant' でアニメーション無しでスクロール
        handleScroll(idx, 'instant', cardCarouselStyleFactors);
    }, [device]);

    return { cardViewOpen };
};
// ========================================================== HOOKS === //