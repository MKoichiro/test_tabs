// 未使用

import React, { FC, MutableRefObject, ReactNode, RefObject, createContext, useContext, useReducer, useRef, useState } from 'react';
import { CategoryType } from '../types/Categories';
import { convertVwToPx } from '../utils/converters';
import { set } from 'react-hook-form';

interface CardViewContextType {
  isOpen:                                boolean;
  setIsOpen:           (isOpen: boolean) => void;
  dialogRef: MutableRefObject<HTMLDialogElement | null> | null;
  carouselContainerRef: MutableRefObject<HTMLUListElement | null> | null;
  activeIdx:                            number;
  setActiveIdx: (n: number) => void;
  registerContainer: (args: CardViewHookType) => { adjustedPadding_vw: string };
  handleScroll: (n: number, behavior: ScrollBehavior) => void;
  cardViewOpen: (index: number) => void;
}

export const CardViewContext = createContext<CardViewContextType>({
  isOpen:       false,
  setIsOpen: () => {},
  dialogRef: null,
  carouselContainerRef: null,
  activeIdx: 0,
  setActiveIdx: () => {},
  registerContainer: () => { return { adjustedPadding_vw: '' } },
  handleScroll: () => {},
  cardViewOpen: () => {},
});


interface CardViewType {
  children: ReactNode;
}


export const CardViewProvider: FC<CardViewType> = (props) => {
  const { children } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const carouselContainerRef = useRef<HTMLUListElement | null>(null);

  const [carouselGap_vw, setCarouselGap_vw] = useState(0);
  const [inactiveMagnification, setInactiveMagnification] = useState(0);
  const [inactiveWidth_vw, setInactiveWidth_vw] = useState(0);
  const [carouselPadding_vw, setCarouselPadding_vw] = useState(0);
  

  
  const registerContainer = (args: CardViewHookType) => {
    const { carouselGap_vw, activeWidth_vw, inactiveMagnification } = args;

    const carouselPadding_vw = carouselGap_vw * 2;
    const inactiveWidth_vw   = activeWidth_vw * inactiveMagnification;
    const adjustedPadding_vw = `0 ${carouselPadding_vw}vw`;

    setCarouselGap_vw(carouselGap_vw);
    setInactiveMagnification(inactiveMagnification);
    setInactiveWidth_vw(inactiveWidth_vw);
    setCarouselPadding_vw(carouselPadding_vw);
  
    return { adjustedPadding_vw };
  };
  
  const handleScroll = (n: number, behavior: ScrollBehavior) => {
    // null check
    if (!carouselContainerRef.current) { return }
  
    // convert vw to px
    const gap           = convertVwToPx(carouselGap_vw);
    const padding       = convertVwToPx(carouselPadding_vw);
    const inactiveWidth = convertVwToPx(inactiveWidth_vw);
  
    // calculate Moving Distance [px]
    let Xn: number;
    switch (n) {
      case 0:   Xn = 0;                                                                 break;
      default:  Xn = padding + (inactiveWidth + gap)*(n - 1) + (inactiveWidth - gap);   break;
    }
  
    // execute scroll
    carouselContainerRef.current.scrollTo({ left: Xn, behavior });
  };

  const cardViewOpen = (index: number) => {
    if (!dialogRef || !dialogRef.current) { return }
    dialogRef.current.showModal();
    setIsOpen(true);
    handleScroll(index, 'instant');
  }



  // providing value
  const value = {
    isOpen,
    setIsOpen,
    dialogRef,
    carouselContainerRef,
    activeIdx,
    setActiveIdx,
    registerContainer,
    handleScroll,
    cardViewOpen,
  }

  return <CardViewContext.Provider value={value} children={children} />
};





interface CardViewHookType {
  // carouselContainerRef: MutableRefObject<HTMLUListElement | null>; // carousel container の ref
  carouselGap_vw:                                          number; // carousel item 間の間隔
  activeWidth_vw:                                          number; // active item の幅
  inactiveMagnification:                                   number; // inactive item の幅を active item の何倍にするか
}
