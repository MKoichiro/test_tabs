/*
  [Detail Components]
    elemnt: section
    description:
      todos の detail とその他プロパティを表示する component
      SortableTodo と Todo の 2 箇所で呼び出される
*/


/* common: essential */
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
/* common: others */
import { PriorityType, StatusType } from '../../../types/Todos';

const isDev = (process.env.NODE_ENV === 'development');


// === component 定義部分 ============================================= //
interface PropsType { 
  created_date: Date;
  updated_date: Date;
  status: StatusType;
  priority: PriorityType;
  archived: boolean;
  detail?: string;
  deadline: { date: Date; use_time: boolean; } | 'not set';
  open: boolean;
}

export const Detail = (props: PropsType) => {
  const detailRef = useRef<HTMLParagraphElement | null>(null);
  const infoRef = useRef<HTMLElement | null>(null);
  const [height, setHeight] = useState<number | null>(null); 
  const heightGetterRef = useRef<HTMLDivElement | null>(null);

  const {
    created_date,
    updated_date,
    status,
    priority,
    archived,
    detail,
    deadline,
    open: isOpen,
  } = props;

  useEffect(() => {
    if (heightGetterRef.current) {
      const newHeight = heightGetterRef.current.getBoundingClientRect().height;
      setHeight(newHeight);
    }
  }, [isOpen]);

  // deadline プロパティを表示形式に整形する関数
  const getDeadline = () => {
    if (deadline !== 'not set') {
      const date    = deadline.date.toLocaleDateString();
      const hours   = deadline.date.getHours();
      const minutes = String(deadline.date.getMinutes()).padStart(2, '0');

      const dateFormatted = deadline.use_time ? `${ date } ${ hours }:${ minutes }` : `${ date }`;
      return dateFormatted;
    } else {
      return 'not set';
    }
  };

  return (
    <StyledSection
      className="detail-container"
      $isOpen={ isOpen }
      $height={ height }
    >
      <div
        className="children-height-getter"
        ref={ heightGetterRef }
      >
        <section className="detail" >
          <p ref={ detailRef }>{detail}</p>
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
};
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
const StyledSection = styled.section<{ $isOpen: boolean; $height: number | null }>`
  background: ${ isDev ? '#990' : '' };
  /* △ only dev env △ */

  height: ${ props => props.$isOpen ? `${ props.$height }px` : '0' };
  transition: height 500ms;
  contain: paint;

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