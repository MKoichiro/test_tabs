/*
  [Detail Components]
    elemnt: section
    description:
      todos の detail とその他プロパティを表示する component
      SortableTodo と Todo の 2 箇所で呼び出される
*/


/* common: essential */
import React, { useContext, useLayoutEffect, useEffect, useRef, useState, LegacyRef, RefObject } from 'react';
import styled from 'styled-components';
/* common: others */
import { PriorityType, StatusType } from '../../../types/Todos';
import { MdeAdminContext } from '../../../Providers';
import DOMPurify from 'dompurify';
const marked = require('marked');


const isDev = (process.env.NODE_ENV === 'development');


// === component 定義部分 ============================================= //
interface PropsType { 
  todoIdx?: number;
  created_date: Date;
  updated_date: Date;
  status: StatusType;
  priority: PriorityType;
  archived: boolean;
  detail: string;
  deadline: { date: Date; use_time: boolean; } | 'not set';
  open: boolean;
}


  export const Detail = React.forwardRef((props: PropsType, containerRef: LegacyRef<HTMLDivElement> | undefined) => {
  const infoRef = useRef<HTMLElement | null>(null);
  const [height, setHeight] = useState<number | null>(null); 
  const heightGetterRef = useRef<HTMLDivElement | null>(null);

  const {
    todoIdx,
    created_date,
    updated_date,
    status,
    priority,
    archived,
    detail,
    deadline,
    open: isOpen,
  } = props;

  useLayoutEffect(() => {
    console.log('executed');
    if (heightGetterRef.current) {
      const newHeight = heightGetterRef.current.getBoundingClientRect().height;
      setHeight(newHeight);
    }
  }, [isOpen, detail]);

  // deadline プロパティを表示形式に整形する関数
  const getDeadline = () => {
    if (deadline === 'not set') { return deadline }

    const date    = deadline.date.toLocaleDateString();
    const hours   = deadline.date.getHours();
    const minutes = String(deadline.date.getMinutes()).padStart(2, '0');
    const dateFormatted = deadline.use_time ? `${ date } ${ hours }:${ minutes }` : `${ date }`;
    return dateFormatted;
  };

  const {
    mdeRef,
    modalRef,
    maskRef,
    inEditing,
    setInEditing,
    setTargetTodoIdx,
    handleModalClose,
    ...rest
  } = useContext(MdeAdminContext);

  const handleOutsideClick = (e: MouseEvent) => {
    if ((e.target as Element).closest('.mde-modal-contents')) { return }
    handleModalClose();
  };

  const toggleMode = () => {
    // close mde modal: 正味の処理内容は handleOutsideClick 関数内
    if (inEditing) {
      document.removeEventListener('mousedown', handleOutsideClick);
      return;
    }

    // open mde modal
    if (!inEditing) {
      console.log('pass');
      setInEditing(true);
      if (todoIdx || todoIdx === 0) { setTargetTodoIdx(todoIdx) }

      // scroll 位置を制御: 該当 todo の頭が画面内の先頭に来るように
      const targetDiv = (containerRef as RefObject<HTMLDivElement | null>).current;
      if (targetDiv) {
        const innerY = targetDiv.getBoundingClientRect().top;
        const targetY = innerY + scrollY;
        scrollTo({top: targetY, behavior: 'smooth'});
      }

      document.addEventListener('mousedown', handleOutsideClick);
    }
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
          onDoubleClick={ toggleMode }
        >
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(marked.parse(detail)),
            }} />
        </section>

        <section className="info-items" ref={infoRef}>
          <p className="info-item">
            <span className="info-label">deadline:</span>
            <span className="info-value">{getDeadline()}</span>
          </p>
          <p className="info-item">
            <span className="info-label">creation:</span>
            <span className="info-value">{created_date.toLocaleDateString()}</span>
          </p>
          <p className="info-item">
            <span className="info-label">updated:</span>
            <span className="info-value">{updated_date.toLocaleDateString()}</span>
          </p>
          <p className="info-item">
            <span className="info-label">status:</span>
            <span className="info-value">{status}</span>
          </p>
          <p className="info-item">
            <span className="info-label">priority:</span>
            <span className="info-value">{priority}</span>
          </p>
          {isDev && (
            <>
              <p className="info-item" style={{ color: 'red' }}>
                <span className="info-label">archived:</span>
                <span className="info-value">{String(archived)}</span>
              </p>
              <p className="info-item" style={{ color: 'red' }}>
                <span className="info-label">open:</span>
                <span className="info-value">{String(isOpen)}</span>
              </p>
            </>
          )}
        </section>
      </div>

    </StyledSection>
  )
});
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
const StyledSection = styled.section<{ $isOpen: boolean; $height: number | null; $inEditing: boolean; }>`
  background: ${ isDev ? '#990' : '' };
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


  div.children-height-getter {
    /* ! do not change vertical margin */
    margin-top: 0; margin-bottom: 0;

    .info-items {
      width: 20%;
      margin: 0 1.6rem 0 auto;
      .info-item {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .info-label {

        }
        .info-value {
        }
      }
    }
  }
`;
// ================================================= style 定義部分 === //