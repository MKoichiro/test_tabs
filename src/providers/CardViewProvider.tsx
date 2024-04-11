// 今後の課題
// - swipe でのスクロール
// - cardViewOpen での展開時にアニメーションを一時的に止める


import React, { FC, MutableRefObject, ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react';
import { vw2px } from '../utils/converters';
import { getCurrentDevice, CardCarouselMagicsType as StyleMagicsType, cardCarouselMagics } from '../data/styleMagics';


let initialStyleFactors: StyleMagicsType;
switch (getCurrentDevice()) {
  case 'pc': initialStyleFactors = cardCarouselMagics.pc; break;
  case 'tb': initialStyleFactors = cardCarouselMagics.tb; break;
  case 'sp': initialStyleFactors = cardCarouselMagics.sp; break;
  default:   initialStyleFactors = cardCarouselMagics.pc; break;
}


// === TYPE =========================================================== //
// - CONTEXT
interface CardViewContextType {
  isOpen:                                                           boolean;
  setIsOpen:                                      (isOpen: boolean) => void;
  activeIdx:                                                         number;
  setActiveIdx:                                         (n: number) => void;
  dialogRef:              MutableRefObject<HTMLDialogElement | null> | null;
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
const CardViewContext = createContext<CardViewContextType>({
  isOpen:                                          false,
  setIsOpen:                                    () => {},
  activeIdx:                                           0,
  setActiveIdx:                                 () => {},
  dialogRef:                                        null,
  carouselContainerRef:                             null,
  handleScroll:                                 () => {},
  styleFactors:         { current: initialStyleFactors },
});
// ======================================================== CONTEXT === //


// === PROVIDER ======================================================= //
export const CardViewProvider: FC<CardViewType> = (props) => {
  const { children } = props;

  // states
  const [isOpen,       setIsOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  // refs: nodes
  const dialogRef            = useRef<HTMLDialogElement | null>(null);
  const carouselContainerRef = useRef<HTMLUListElement | null>(null);
  // ref: style factors
  const styleFactors = useRef<StyleMagicsType>(initialStyleFactors);

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
    // null check
    if (!carouselContainerRef.current) { return }

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
  
    // execute scroll
    carouselContainerRef.current.scrollTo({ left: Xn, behavior });
  };
  // ---------------------------------------------- functions --- //


  // providing value
  const value = {
    isOpen,
    setIsOpen,
    activeIdx,
    setActiveIdx,
    dialogRef,
    carouselContainerRef,
    handleScroll,
    styleFactors,
  }

  return <CardViewContext.Provider value={value} children={children} />
};
// === PROVIDER ======================================================= //



// === HOOKS ========================================================== //
// 1. useCardDialogRegister: CardsModal で使用。dialog の登録
export const useCardDialogRegister = () => {
  const { dialogRef } = useContext(CardViewContext);
  return { dialogRef };
}


// 2. registerContainer: CardsCarousel で使用。carousel container となる ul 要素のコンポーネントで登録
export const useCardCarouselRegister = () => {
  const { styleFactors, carouselContainerRef } = useContext(CardViewContext);

    const registerContainer = (args?: StyleMagicsType) => {

      // コンポーネント側からも styleFactors を更新できるようにしてある
      if (args) { styleFactors.current = args }

      return { adjustedPadding_vw: `0 ${styleFactors.current.gap_vw * 2}vw`, carouselContainerRef };
    };

  return { registerContainer };
};


// 3. useCardScroll: CardTodo で使用。card のスクロールを管理
export const useCardScroll = (idx: number) => {
  const [isActive, setIsActive] = useState(false);
  const { handleScroll, activeIdx } = useContext(CardViewContext);

  // 別の CardTodo で activeIdx が変更されたときに isActive を更新
  useEffect(() => {
    setIsActive(idx === activeIdx);
  }, [activeIdx]);

  return { handleScroll, isActive };
};


// 4. useCardViewOpen: ActiveTodo で使用。card view を開くボタンを含むコンポーネントで使用
export const useCardViewOpen = () => {
  const { handleScroll, dialogRef, setActiveIdx, setIsOpen } = useContext(CardViewContext);

  const cardViewOpen = (idx: number) => {
    // null check
    if (!dialogRef || !dialogRef.current) { return }

    // modal を展開
    dialogRef.current.showModal();

    // state を更新
    setActiveIdx(idx);
    setIsOpen(true);

    // 'instant' でスクロール (idxのcardを初期表示)
    handleScroll(idx, 'instant');
  };

  return { cardViewOpen };
};

// 5. getStyleMagics: 任意のコンポーネントで使用。
export const getCardCarouselStyles = () => {
  const { styleFactors } = useContext(CardViewContext);
  return styleFactors.current;
};
// ========================================================== HOOKS === //