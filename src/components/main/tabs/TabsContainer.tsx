/* --- react/styled-components --- */
import React, { FC, useRef, useContext } from 'react';
import styled from 'styled-components';
/* --- providers/contexts -------- */
import { CategoriesContext } from '../../../providers/CategoriesProvider';
import { ModalContext } from '../../../providers/ModalProvider';
/* --- font awesome -------------- */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
/* --- child components ---------- */
import { Tab } from './Tab';
import { EditCategoriesModal } from './edit_categories_modal/EditCategoriesModal';


// === 型定義部分 ===================================================== //
// - component props
interface TabsProps {
	className?: string;
}
// - others
// ===================================================== 型定義部分 === //


// === component 定義部分 ============================================= //
export const TabsContainer: FC<TabsProps> = (props) => {
  const { className } = props;
  const { categories } = useContext(CategoriesContext);

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
        { categories.map((category, i) => {

          return (
            <Tab
              key={                           category.id }
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