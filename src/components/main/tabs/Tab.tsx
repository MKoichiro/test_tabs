/*
  [Tab Component]
    element: li
    description:
      category を切り替える tab menu の各 tab 要素
*/


/* common: required */
import React, { useContext, forwardRef, Ref, RefObject } from 'react';
import styled from 'styled-components';
/* common: others */
import { TodosType } from '../../../types/Todos';
import { AllTodosAdminContext } from '../../../Providers';
import { $contentWidth, getPx } from '../../../Providers';


// === component 定義部分 ============================================= //
interface PropsType {
  todos: TodosType;
  index: number;
  containerRef: RefObject<HTMLUListElement | null>;
}

export const Tab = forwardRef((props: PropsType, liRef: Ref<HTMLLIElement>) => {
  const { todos, index, containerRef } = props;
  const { allTodos, dispatchAllTodosChange } = useContext(AllTodosAdminContext);



  const handleContainerScroll = () => {
    // null check
    const container = containerRef.current;
    const currentContentWidth = getPx($contentWidth);
    if (!liRef) {     console.error('li 要素が見つかりません。'); return; }
    if (!container) { console.error('tab ul が見つかりません。'); return; }

    // get scroll coordinate
    if (!(currentContentWidth instanceof Error)) {
      const inActiveTabWidth = currentContentWidth * .15;
      const scroll = inActiveTabWidth * index;
      // execute scroll
      container.scrollTo({ left: scroll, behavior: 'smooth' });
    }
  };

  const toggleActive = () => {
    handleContainerScroll();
    dispatchAllTodosChange({ type: 'switch_tab', newActiveIndex: index });
  };


  return (
    <StyledLi
      key={           todos.id }
      $isActive={ todos.active }
      ref={              liRef }
    >
      <button
        children={ todos.category_name }
        onClick={         toggleActive } />

      { (index !== allTodos.length - 1) && <span className="separater" /> }
    </StyledLi>
  )
});
// ============================================= component 定義部分 === //



// === style 定義部分 ================================================= //
interface StylePropsType {
  $isActive: boolean;
}

const StyledLi = styled.li<StylePropsType>`
    & {
    display: flex;
    gap: inherit;
    align-items: center;
    flex-grow: 1;
    flex-shrink: 0;

    transition: max-width 750ms;
    max-width: ${ props => props.$isActive ? `100%` : '15%' };

    height: 100%;
    min-width: 15%;
  }

  button {
    display: block;
    width: 100%;
    height: 66.7%;
    padding: 0 .8rem;

    background: ${ props => props.$isActive ? '#454e70' : '#ddd' };
    color: ${ props => props.$isActive ? '#fff' : '' };
    margin-left: .4rem;

    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: scale 50ms;
  }
  button:active { scale: .9; }

  .separater {
    height: 100%;
    min-width: .15rem;
    margin-left:.4rem;

    background: #fff;
  }
`;
// ================================================= style 定義部分 === //