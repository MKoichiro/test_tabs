/*
  [Tabs Component]
    element: ul (→ 今後 nav に変更する)
    description:
      category を切り替える tab menu を提供している
*/

/* common: essential */
import React, { FC, useRef, useContext, useState, useCallback, useReducer, MutableRefObject, ReactNode, createContext, Dispatch, useEffect } from 'react';
import styled from 'styled-components';
/* common: others */
import { AllTodosContext } from '../../../providers/AllTodosProvider';
/* children components */
import { Tab } from './Tab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { EditCategoriesModal } from './edit_categories_modal/EditCategoriesModal';
import { ModalContext } from '../../../providers/ModalProvider';


// === component 定義部分 ============================================= //
interface TabsProps {
	className?: string;
}




export const TabsContainer: FC<TabsProps> = (props) => {
  const { className } = props;
  const { allTodos  } = useContext(AllTodosContext);

  const containerRef = useRef<HTMLUListElement | null>(null);
  const liRefs       = useRef<(HTMLLIElement | null)[]>([]);

  const { dispatchOpen } = useContext(ModalContext);
  const handleOpenBtnClick = () => {
    dispatchOpen();
  };


	return (
    <StyledNav>
      <ul
        className = { className    }
        ref       = { containerRef }
      >
        { allTodos.map((todos, i) => {

          return (
            <Tab
              key={                           todos.id }
              todos={                            todos }
              ref={    e => { liRefs.current[i] = e; } }
              containerRef={              containerRef }
              index={                                i } />
          )
          }) }
      </ul>
      <span/>
      <button onClick={handleOpenBtnClick}>
        <FontAwesomeIcon icon={faPen} />
      </button>

      <EditCategoriesModal/>
    </StyledNav>

	);
};
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
const StyledNav = styled.nav`
  margin-top: 3.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left:1.6rem;
  height: 5rem;
  > ul {
    width: 62vw;
    display: flex;
    height: 100%;
    overflow-x: auto;

    -ms-overflow-style: none;
    scrollbar-width: none;
    ::-webkit-scrollbar { display: none; };
  }
  >span {
    display: block;
    height: 100%;
    background: #fff;
    width: 3px;
    margin-left: 1.6rem;
  }
  >button {
    display: block;
    padding: 0 1.6rem;
  }
`;
// ================================================= style 定義部分 === //