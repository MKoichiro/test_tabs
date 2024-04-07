import React, { FC, useRef, useState } from 'react'
import styled from 'styled-components';
import { CardTodo } from './CardTodo';
import { convertVwToPx } from '../../../../../utils/converters';
import { CategoryType } from '../../../../../types/Categories';

const carouselGap_vw = 5;
const carouselPadding_vw = carouselGap_vw * 2;
const activeWidth_vw = 80;
const inactiveWidth_vw = activeWidth_vw / 2;

interface PropsType {
  category: CategoryType;
  index: number;
  isOpen: boolean;
}
export const CardsCarousel: FC<PropsType> = (props) => {
  const { category, isOpen } = props;
  const [cardActiveIdx, setCardActiveIdx] = useState(0);
  const ulRef = useRef<HTMLUListElement | null>(null)
  const updateCardActiveIdx = (newIdx: number) => {
    setCardActiveIdx(newIdx);
    handleScroll(newIdx);
  };
  const todosFormatted = category.todos; // archiveしたものを削除または最後尾にした配列を渡すべき


  const gap           = convertVwToPx(carouselGap_vw);
  const padding       = convertVwToPx(carouselPadding_vw);
  const inactiveWidth = convertVwToPx(inactiveWidth_vw);

  const handleScroll = (n: number) => {
    if (!ulRef.current) { return }

    let Xn: number;
    switch (n) {
      case 0:   Xn = 0;                                                                 break;
      default:  Xn = padding + (inactiveWidth + gap)*(n - 1) + (inactiveWidth - gap);   break;
    }

    ulRef.current.scrollTo({ left: Xn, behavior: 'smooth' });
  };


  return (
    <StyledUl
      $cardActiveIdx={ cardActiveIdx }
      ref={ulRef}
    >
      { todosFormatted.map((todo, i) => (
          <CardTodo
            key={ todo.id }
            todo={todo}
            index={ i }
            cardActiveIdx={ cardActiveIdx }
            updateCardActiveIdx={updateCardActiveIdx} />
       )
      ) }
    </StyledUl>
  );
};

const StyledUl = styled.ul<{$cardActiveIdx: number}>`
  --gap: ${`${carouselGap_vw}vw`};
  background: transparent;
  padding: 0 calc(var(--gap) * 2);
  gap: var(--gap);
  display: flex;
  align-items: center;
  overflow-x: auto;
  height: 100%;
`;