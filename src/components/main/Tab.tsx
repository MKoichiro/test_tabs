/* Main Component */

/* react 関連 */
import React, { FC, useState, useRef, useEffect, ReactElement } from 'react'; // 他の hooks も必要に応じてここでimport
/* styled-components 関連 */
import styled, { css } from 'styled-components';

interface TabsContainerProps {
	className?: string;
}

const categories = [
  {
    id: 0,
    name: 'Category-0',
  },
  {
    id: 1,
    name: 'Category-1',
  },
  {
    id: 2,
    name: 'Category-2Category-2Category-2Category-2Category-2Category-2',
  },
  {
    id: 3,
    name: 'Category-3',
  },
  {
    id: 4,
    name: 'Category-4',
  },
  {
    id: 5,
    name: 'Category-5',
  },
  {
    id: 6,
    name: 'Category-6',
  },
  {
    id: 7,
    name: 'Category-7',
  },
  {
    id: 8,
    name: 'Category-8',
  },
];

// === component 定義部分 ============================================= //
const TabsContainer: FC<TabsContainerProps> = (props) => {

  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLUListElement>(null);

  const handleContainerScroll = (e: React.MouseEvent) => {
    const targetElm = e.currentTarget.closest('li');
    if (!targetElm) { console.error('li 要素が見つかりません。'); return; }
    const container = containerRef.current;
    if (!container) { console.error('tab ul が見つかりません。'); return; }

    const targetRect = targetElm.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const scroll = targetRect.left - containerRect.left;
    console.log(scroll);

    setTimeout(() => {
      container.scrollBy({ left: scroll, behavior: 'smooth' });
      console.log('excuted');
    }, 0);
  };
  
  const handleTabClick = (i: number, e: React.MouseEvent) => {
    handleContainerScroll(e);
    setActiveIndex(i);
  };

  const liRef = useRef<HTMLLIElement>(null);


  const tabItems = categories.map((category, i) => {
    let tabWidth: number | null = null;
    useEffect(() => {
      console.log(liRef.current);
      if (liRef.current) { tabWidth = liRef.current.getBoundingClientRect().width; } else { return; }
    console.log(`${category.name}: ${ tabWidth }`);
    }, []);



    const [isActive, setIsActive] = useState(true);
    useEffect(() => { setIsActive(activeIndex === i); }, [activeIndex]);

    return (
      <StyledLi
        as="li"
        $tabWidth = { tabWidth }
        key = { category.name }
        className = { isActive ? 'active' : '' }
        ref = { liRef } >

        <button
          children = { category.name }
          onClick = { (e) => { handleTabClick(i, e) } } />
        { (categories.length - 1 !== i) &&
          <span className = { `separater` } /> }

      </StyledLi>
    );
  });

	return (
    <ul className = { props.className } ref = { containerRef } >
      { tabItems }
    </ul>
	);
};
// ============================================= component 定義部分 === //

// === style 定義部分 ================================================= //
const StyledTabsContainer = styled(TabsContainer)`
  background: green;
  display: flex;
  height: 4rem;
  margin-top: 3.2rem;
  overflow-x: scroll;
  gap: .4rem;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }

  li {
    background: blue;
    height: 100%;
    flex-grow: 1;
    flex-shrink: 1;
    min-width: 15%;
    max-width: 25%;
    display: flex;
    gap: inherit;
    align-items: center;
    transition: flex-shrink 1s;
    &.active {
      background: orange;
      flex-shrink: 0;
    }

    button {
      background: red;
      display: block;
      height: 66.7%;
      width: 100%;
      padding: 0 .8rem;

      overflow-x: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      transition: scale 50ms, color 1s;
    }
    button:active {
      scale: .9;
    }

    &.active button {
      color: yellow;
    }

    .separater {
      background: pink;
      height: 100%;
      height: 100%;
      min-width: .15rem;
    }
  }
`;

const StyledLi = styled.li<{ $tabWidth: number | null }>`
  min-width: ${ props => props.$tabWidth ? `${ props.$tabWidth }px` : '15%' };
`;
// ================================================= style 定義部分 === //

export { StyledTabsContainer };