// 今後の課題
// - swipe でのスクロール
// - cardViewOpen での展開時にアニメーションを一時的に止める
// - 移動距離を算出するために必要なのは、styleFactorと、handleScroll。
//   よって、styleFactorとhandleScrollを分離できれば、純粋にcarouselのロジックだけを提供するproviderになる気がする。
//   他でも別種のカルーセルを使用するならば、修正を検討してもいいかもしれない。


import React, { FC, MutableRefObject, ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react';
import { vw2px } from '../utils/converters';
import { getCurrentDevice, CardCarouselMagicsType as StyleMagicsType, cardCarouselMagics } from '../data/styleMagics';
import { useModalOpener } from './ModalElmsRef';
import { modalNames } from './modalNames';


let initialStyleFactors: StyleMagicsType;
switch (getCurrentDevice()) {
  case 'pc': initialStyleFactors = cardCarouselMagics.pc; break;
  case 'tb': initialStyleFactors = cardCarouselMagics.tb; break;
  case 'sp': initialStyleFactors = cardCarouselMagics.sp; break;
  default:   initialStyleFactors = cardCarouselMagics.pc; break;
}


// === TYPE =========================================================== //
// - CONTEXT
interface ContextType {
  activeIdx:                                                         number;
  setActiveIdx:                                         (n: number) => void;
  carouselContainerRef:    MutableRefObject<HTMLUListElement | null> | null;
  handleScroll:               (n: number, behavior: ScrollBehavior) => void;
  styleFactors:                           MutableRefObject<StyleMagicsType>;
}
// - PROVIDER
interface CardViewType {
  children: ReactNode;
}
// =========================================================== TYPE === //


// === CONTEXT ======================================================== //
const Context = createContext<ContextType>({
  activeIdx:                                           0,
  setActiveIdx:                                 () => {},
  carouselContainerRef:                             null,
  handleScroll:                                 () => {},
  styleFactors:         { current: initialStyleFactors },
});
// ======================================================== CONTEXT === //


// === PROVIDER ======================================================= //
export const CardView: FC<CardViewType> = (props) => {
  const { children } = props;

  // --- Manegiment Items --------------------------------------- //
  // 1. states
  const [activeIdx, setActiveIdx] = useState(0);
  // 2. refs: nodes
  const carouselContainerRef = useRef<HTMLUListElement | null>(null);
  // 3. ref: style factors
  const styleFactors = useRef<StyleMagicsType>(initialStyleFactors);
  // --------------------------------------- Manegiment Items --- //


  // --- resize-event ------------------------------------------- //
  useEffect(() => {
    let resizeTimer: NodeJS.Timeout;
    const delay = 200;

    const handleResize = () => {
      if (!styleFactors.current) { return }
      switch (getCurrentDevice()) {
        case 'pc': styleFactors.current = cardCarouselMagics.pc; break;
        case 'tb': styleFactors.current = cardCarouselMagics.tb; break;
        case 'sp': styleFactors.current = cardCarouselMagics.sp; break;
        default:   styleFactors.current = cardCarouselMagics.pc; break;
      }
    };

    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, delay); // Adjust the delay time as needed
    };

    addEventListener('resize', debouncedResize);
    return () => removeEventListener('resize', debouncedResize);
  }, []);
  // ------------------------------------------- resize-event --- //


  // --- functions ---------------------------------------------- //
  const handleScroll = (n: number, behavior: ScrollBehavior) => {

    // 1. set activeIdx
    setActiveIdx(n);

    // 2. scroll
    const { gap_vw, activeWidth_vw, inactiveMagnification } = styleFactors.current;
    const padding_vw       = gap_vw         *                     2;
    const inactiveWidth_vw = activeWidth_vw * inactiveMagnification;
    
    // convert vw to px
    const gap           = vw2px(gap_vw);
    const padding       = vw2px(padding_vw);
    const inactiveWidth = vw2px(inactiveWidth_vw);
    
    // calculate Moving Distance [px]
    let Xn: number;
    switch (n) {
      case 0:   Xn = 0;                                                                 break;
      default:  Xn = padding + (inactiveWidth + gap)*(n - 1) + (inactiveWidth - gap);   break;
    }
    
    // execute scroll: modal は普段は非表示なので、css の適用を待つ意味で requestAnimationFrame を使用
    requestAnimationFrame(() => {
      if (!carouselContainerRef.current) { return }
        carouselContainerRef.current.scrollTo({ left: Xn, behavior });
    });
  };
  // ---------------------------------------------- functions --- //


  // providing value
  const value = {
    activeIdx,
    setActiveIdx,
    carouselContainerRef,
    handleScroll,
    styleFactors,
  };

  return <Context.Provider value={value} children={children} />
};
// === PROVIDER ======================================================= //



// === HOOKS ========================================================== //
// 1. registerContainer: CardsCarousel で使用。carousel container となる ul 要素のコンポーネントで登録
export const useCardCarouselRegister = () => {
  const { styleFactors, carouselContainerRef } = useContext(Context);

    const registerContainer = (args?: StyleMagicsType) => {

      // コンポーネント側からも styleFactors を更新できるようにしてある
      if (args) { styleFactors.current = args }

      return { adjustedPadding_vw: `0 ${styleFactors.current.gap_vw * 2}vw`, carouselContainerRef };
    };

  return { registerContainer };
};


// 2. useCardScroll: CardTodo で使用。card のスクロールを管理
export const useCardScroll = (idx: number) => {
  const [isActive, setIsActive] = useState(false);
  const { handleScroll, activeIdx } = useContext(Context);

  // 別の CardTodo で activeIdx が変更されたときに isActive を更新
  useEffect(() => {
    setIsActive(idx === activeIdx);
  }, [activeIdx]);

  return { handleScroll, isActive };
};


// 3. useCardViewOpen: ActiveTodo で使用。card view を開くボタンを含むコンポーネントで使用
export const useCardViewOpener = () => {
  const { handleScroll, setActiveIdx } = useContext(Context);
  const modalName = modalNames.cardCarousel;
  // const { openModal } = useModalOpener(modalName);
  const openModal = useModalOpener(modalName);

  const cardViewOpen = (idx: number) => {
    // idx 番目の card で modal を開く
    openModal();
    setActiveIdx(idx);
    // 'instant' でアニメーション無しでスクロール
    handleScroll(idx, 'instant');
  };

  return { cardViewOpen };
};

// 4. getStyleMagics: 任意のコンポーネントで使用。
export const getCardCarouselStyles = () => {
  const { styleFactors } = useContext(Context);
  return styleFactors.current;
};
// ========================================================== HOOKS === //