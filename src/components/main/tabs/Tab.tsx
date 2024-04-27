


/* --- react/styled-components --- */
import React, { RefObject, FC } from 'react';
import styled from 'styled-components';
/* --- redux --------------------- */
import { useDispatch, useCategoriesSelector } from '../../../providers/redux/store';
import { switchCategory } from '../../../providers/redux/slices/categoriesSlice';
/* --- utils --------------------- */
import { vw2px } from '../../../utils/converters';
/* --- dev ----------------------- */
import { isDebugMode } from '../../../utils/adminDebugMode';


// === TYPE =========================================================== //
// - PROPS
interface TabType {
  index: number;
  ulRef: RefObject<HTMLUListElement>;
}
// - STYLE
interface StylePropsType {
  $isActive: boolean;
}
// - OTHERS
// =========================================================== TYPE === //


// === COMPONENT ====================================================== //
/**
 * Tab コンポーネントはタブ切り替え機能を提供します。
 * 
 * @example
 * <Tab>...</Tab>
 */
export const Tab: FC<TabType> = (props) => {
  const { index, ulRef } = props;

  // contexts
  const { activeIdx, categoriesEntity: categories } = useCategoriesSelector();
  const dispatch = useDispatch();

  // constants/variables
  const category = categories[index];
  const isActive = Boolean(activeIdx === index);

  // handlers
  const toggleActive = () => {
    handleContainerScroll();
    dispatch(switchCategory(index));
  };

  // helpers
  const handleContainerScroll = () => {
    // null check
    if (!ulRef.current) { console.error('tab ul が見つかりません。'); return; }

    const container = ulRef.current;
    const currentContentWidth = vw2px(62);

    // get scroll coordinate
    const inActiveTabWidth = currentContentWidth * .15;
    const scroll = inActiveTabWidth * index;
    // execute scroll
    container.scrollTo({ left: scroll, behavior: 'smooth' });
  };


  return (
    <StyledLi
      key       = {       category.id }
      $isActive = {          isActive }
    >
      <button
        children = { category.name }
        onClick = {   toggleActive } />

      { (index !== categories.length - 1) && <span className="separater" /> }
    </StyledLi>
  )
};
// ====================================================== COMPONENT === //


// === STYLE ========================================================= //


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
// ========================================================= STYLE === //