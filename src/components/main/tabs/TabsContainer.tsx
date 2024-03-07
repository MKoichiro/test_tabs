/* Tabs Component */

import React, { FC, useRef, useContext } from 'react'; // 他の hooks も必要に応じてここでimport
import styled from 'styled-components';
import { AllTodosAdminContext } from '../../../Providers';
import { Tab } from './Tab';


// === component 定義部分 ============================================= //
interface TabsContainerProps {
	className?: string;
}
const TabsContainer: FC<TabsContainerProps> = (props) => {
  const { className } = props;
  const { allTodos } = useContext(AllTodosAdminContext);

  const containerRef = useRef<HTMLUListElement | null>(null);
  // const liRefs       = allTodos.map(() => useRef<HTMLLIElement | null>(null)); // anti-pattern
  const liRefs       = useRef<(HTMLLIElement | null)[]>([]);



	return (
    <ul
      className = { className    }
      ref       = { containerRef }
    >
      { allTodos.map((todos, i) => {

        return (
          <Tab
            key={                           todos.id }
            todos={                            todos }
            ref= { (e) => { liRefs.current[i] = e; } }
            containerRef={              containerRef }
            index={                                i } />
        )
        }) }
    </ul>
	);
};
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
const StyledTabsContainer = styled(TabsContainer)<TabsContainerProps>`
  display: flex;
  height: 4rem;
  margin-top: 3.2rem;
  overflow-x: scroll;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; };
`;
// ================================================= style 定義部分 === //


export { StyledTabsContainer };