import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { TodoType } from '../../../../types/Todos'



interface PropsType {
  todoData: TodoType;
  index: number;
  cardActiveIdx: number;
  updateCardActiveIdx: (newIdx: number) => void;
}
export const CardTodo: FC<PropsType> = (props) => {
  const {todoData, index, cardActiveIdx, updateCardActiveIdx} = props;
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(index === cardActiveIdx);
  }, [cardActiveIdx]);

  const handleClick = () => {
    updateCardActiveIdx(index);

  };

  return (
    <StyledLi
      $isActive={isActive}
      onClick={handleClick}
    >


      <section className='contents-wrapper'>
        <header>
          <h3>
            { todoData.main }
          </h3>
        </header>

        <div className='color-container'>
          color-container
        </div>

        <div className='info-container'>
          infmation
        </div>

        <div className='detail-container'>
          <p>
            { todoData.detail }
          </p>
        </div>

        <div className='category-container'>
          Category-0
        </div>
      </section>

    </StyledLi>
  )
}

const StyledLi = styled.li<{$isActive: boolean}>`
  --active-width: 80vw;
  --active-height: 80vh;
  --shrink-ratio: .5;
  background: transparent;
  /* outline: 2px solid #000; */
  min-width: ${ props => props.$isActive ? 'var(--active-width)' : 'calc(var(--active-width) * var(--shrink-ratio))' };
  height: ${ props => props.$isActive ? 'var(--active-height)' : 'calc(var(--active-height) * var(--shrink-ratio))' };
  overflow-y: hidden;
  transition: min-width 300ms, height 300ms;
  > * {
    /* transform: ${ props => props.$isActive ? 'scale(1)' : 'scale(.5)' }; */
    /* transition: transform 750ms; */
  }
  .contents-wrapper {
    height: 100%;
    display: grid;
    grid-template:
      "heading    heading"  auto
      "color       detail"   1fr
      "info        detail"   2fr
      "category  category"  auto
    /       1fr       1fr;
    gap: 1.2rem;
    header {
      grid-area: heading;
      background: #eee;
    }
    .color-container {
      margin: 10%;
      grid-area: color;
      background: #eee;
    }
    .info-container {
      grid-area: info;
      background: #eee;
    }
    .detail-container {
      > * {
        transform: ${props => props.$isActive ? 'scale(1)' : 'scale(.5)'};
        transform-origin: top left;
        transition: transform 300ms;
      }
      grid-area: detail;
      background: #eee;
    }
    .category-container {
      grid-area: category;
      background: #eee;
    }
  }
`;