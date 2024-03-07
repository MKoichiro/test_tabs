/*
  [Tabs Component]
    element: ul (→ 今後 nav に変更する)
    description:
      category を切り替える tab menu を提供している
*/

/* common: essential */
import React, { FC, useRef, useContext } from 'react';
import styled from 'styled-components';
/* common: others */
import { AllTodosAdminContext } from '../../../Providers';
/* children components */
import { Tab } from './Tab';


// === component 定義部分 ============================================= //
interface TabsProps {
	className?: string;
}
const Tabs: FC<TabsProps> = (props) => {
  const { className } = props;
  const { allTodos } = useContext(AllTodosAdminContext);

  const containerRef = useRef<HTMLUListElement | null>(null);
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
            ref= {   e => { liRefs.current[i] = e; } }
            containerRef={              containerRef }
            index={                                i } />
        )
        }) }
    </ul>
	);
};
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
const StyledTabsContainer = styled(Tabs)<TabsProps>`
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