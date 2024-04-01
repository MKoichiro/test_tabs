/*
  [Detail Components]
    elemnt: section
    description:
      todos の detail とその他プロパティを表示する component
      SortableTodo と Todo の 2 箇所で呼び出される
*/


/* common: essential */
import React, { useContext, useLayoutEffect, useRef, useState, LegacyRef } from 'react';
import styled from 'styled-components';
/* common: others */
import { MdeContext } from '../../../../providers/MdeProvider';
import DOMPurify from 'dompurify';
const marked = require('marked');
import { TodoType } from '../../../../types/Todos';
import { InfoTable } from './InfoTable';


const isDev = (process.env.NODE_ENV === 'development');


// === component 定義部分 ============================================= //
interface PropsType { 
  todoIdx?: number;
  todo: TodoType;
}

export const TodoDetail = React.forwardRef((props: PropsType, containerRef: LegacyRef<HTMLDivElement> | undefined) => {
  // const infoRef = useRef<HTMLElement | null>(null);
  const [height, setHeight] = useState<number | null>(null); 
  const heightGetterRef = useRef<HTMLDivElement | null>(null);

  const { todoIdx, todo } = props;
  const {
    detail,
    open: isOpen,
  } = todo;

  useLayoutEffect(() => {
    if (heightGetterRef.current) {
      const newHeight = heightGetterRef.current.getBoundingClientRect().height;
      setHeight(newHeight);
    }
  }, [isOpen, detail]);


  const {
    inEditing,
    handleModalOpen,
    ...rest
  } = useContext(MdeContext);


  const executeModalOpen = () => {
    handleModalOpen(todoIdx, containerRef);
  };



  return (
    <StyledSection
      $isOpen={ isOpen }
      $height={ height }
      $inEditing={ inEditing }
    >
      <div
        className="children-height-getter"
        ref={ heightGetterRef }
      >
        <section
          className="detail-container"
          onDoubleClick={ executeModalOpen }
        >
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(marked.parse(detail)),
            }} />
        </section>

        <InfoTable todo={ todo } />
      </div>

    </StyledSection>
  )
});
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
const StyledSection = styled.section<{ $isOpen: boolean; $height: number | null; $inEditing: boolean; }>`
  /* background: ${ isDev ? '#990' : '' }; */
  /* △ only dev env △ */

  height: ${ props => props.$isOpen ? `${ props.$height }px` : '0' };
  transition: height 500ms;
  contain: paint;

  .detail-container {
    h1 {
      font-size: 2.2rem;
      @media (width < 600px) { font-size: 18px }
    }
    h2 {
      font-size: 2.0rem;
      @media (width < 600px) { font-size: 16px }
    }
    h3 {
      font-size: 1.8rem;
      @media (width < 600px) { font-size: 14px }
    }
    h4 {
      font-size: 1.6rem;
      @media (width < 600px) { font-size: 12px }
    }
    h5 {
      font-size: 1.4rem;
      @media (width < 600px) { font-size: 10px }
    }
    h6 {
      font-size: 1.2rem;
      @media (width < 600px) { font-size: 8px }
    }

    ol {
        list-style-type: decimal;
        padding-left: 16px;
        margin-left: 16px;
    }
    ul {
        list-style-type: circle;
        padding-left: 16px;
        margin-left: 16px;
    }
    li {

    }

  }


  .children-height-getter {
    /* ! do not change vertical margin */
    margin-top: 0; margin-bottom: 0;

    .detail-container {
      
      padding: .8rem 1.6rem;
      > div {
        padding-left: 1.6rem;
        border-left: .15rem solid #777;

      }
    }

  }
`;
// ================================================= style 定義部分 === //