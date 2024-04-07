/* --- react/styled-components --- */
import React, { useContext, useLayoutEffect, useRef, useState, LegacyRef, forwardRef } from 'react';
import styled from 'styled-components';
/* --- child components ---------- */
import { InfoTable } from './InfoTable';
/* --- providers/contexts -------- */
// import { MdeContext } from '../../../../../providers/MdeProvider';
import { CategoriesContext } from '../../../../../providers/CategoriesProvider';
/* --- types --------------------- */
import { TodoType } from '../../../../../types/Categories';



// useUnsettledHeightAcc: 内容物の高さが可変のアコーディオンを実装するためのカスタムフック
//                        open/close 状態を保持する isOpen state は保守性のため外部で定義して渡す。
//                        また、内容物の文字列が変更された時にも高さを再取得する必要があるため、
//                        state 管理されたテキストコンテンツを changeableTxtContentsState を引数で渡す必要がある。
const useUnsettledHeightAcc = (isOpen: boolean, changeableTxtContentsState: string) => {
  const [height, setHeight] = useState<number | null>(null);

  const heightGetterRef = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    if (heightGetterRef.current) {
      const newHeight = heightGetterRef.current.getBoundingClientRect().height;
      setHeight(newHeight);
    }
  }, [isOpen, changeableTxtContentsState]);
  return { height, heightGetterRef };
};


// === 型定義部分 ===================================================== //
// - component props
interface PropsType { 
  liIdx?: number;
  todo: TodoType;
}
// - others
// ===================================================== 型定義部分 === //


// === component 定義部分 ============================================= //
export const TodoDetail = forwardRef((props: PropsType, containerRef: LegacyRef<HTMLDivElement> | undefined) => {
  const { liIdx, todo } = props;
  const { detail, isOpen } = todo;
  const { getSanitizedDetail } = useContext(CategoriesContext);
  const { height, heightGetterRef } = useUnsettledHeightAcc(isOpen, detail);
  // const { inEditing, handleModalOpen } = useContext(MdeContext);

  const executeModalOpen = () => {
    // handleModalOpen(liIdx, containerRef);
  };



  return (
    <StyledSection
      $isOpen={ isOpen }
      $height={ height }
      // $inEditing={ inEditing }
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
              __html: getSanitizedDetail(todo),
            }} />
        </section>

        <InfoTable todo={ todo } />
      </div>

    </StyledSection>
  )
});
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
const StyledSection = styled.section<{ $isOpen: boolean; $height: number | null; /* $inEditing: boolean; */ }>`

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