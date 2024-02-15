/* Main Component */

/* react 関連 */
import React, { FC, useState, useRef, useEffect } from 'react'; // 他の hooks も必要に応じてここでimport
/* styled-components 関連 */
import styled from 'styled-components';

interface TabsContainerProps {
	className?: string;
}

const categories = [
  { id: 0,  name: 'Category-0',                                                   },
  { id: 1,  name: 'Category-1',                                                   },
  { id: 2,  name: 'Category-2Category-2Category-2Category-2Category-2Category-2', },
  { id: 3,  name: 'Category-3',                                                   },
  { id: 4,  name: 'Category-4',                                                   },
  { id: 5,  name: 'Category-5',                                                   },
  { id: 6,  name: 'Category-6',                                                   },
  { id: 7,  name: 'Category-7',                                                   },
  { id: 8,  name: 'Category-8',                                                   },
  { id: 9,  name: 'Category-9',                                                   },
  { id: 10, name: 'Category-10',                                                  },
];

// === component 定義部分 ============================================= //
const TabsContainer: FC<TabsContainerProps> = (props) => {

  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLUListElement>(null);

  const handleContainerScroll = (i: number, e: React.MouseEvent) => {
    const targetElm = e.currentTarget.closest('li');
    if (!targetElm) { console.error('li 要素が見つかりません。'); return; }
    const container = containerRef.current;
    if (!container) { console.error('tab ul が見つかりません。'); return; }

    const containerWidth = container.getBoundingClientRect().width;
    const inActiveTabWidth = containerWidth * .15;
    const scroll = inActiveTabWidth * i;

    container.scrollTo({ left: scroll, behavior: 'smooth' })
  };
  const handleTabClick = (i: number, e: React.MouseEvent) => {
    handleContainerScroll(i, e);
    setActiveIndex(i);
  };

  const tabItems = categories.map((category, i) => {
    const [tabWidth, setTabWidth]                 = useState<number | null>(null);
    const [beforeInitialize, setBeforeInitialize] = useState(true);
    const [isActive, setIsActive]                 = useState(false);
    const liRef                                   = useRef<HTMLLIElement>(null);

    useEffect(() => {
      if (liRef.current) { setTabWidth(liRef.current.getBoundingClientRect().width); }
      else               { return                                                    }
      setBeforeInitialize(false);
    }, []);
    useEffect(() => { setIsActive(activeIndex === i); }, [activeIndex]);

    return (
      <StyledLi
        key               = { category.name            }
        $beforeInitialize = { beforeInitialize         }
        $tabWidth         = { tabWidth                 }
        $isActive         = { isActive                 }
        ref               = { liRef                    } >

        <button
          children = { category.name }
          onClick = { (e) => { handleTabClick(i, e) } } />
        { (categories.length - 1 !== i) &&
          <span className = { `separater` } /> }

      </StyledLi>
    );
  });

	return (
    <ul
      className = { props.className }
      ref       = { containerRef    }
      children  = { tabItems        } />
	);
};
// ============================================= component 定義部分 === //

// === style 定義部分 ================================================= //
const StyledTabsContainer = styled(TabsContainer)`
  display: flex;
  height: 4rem;
  margin-top: 3.2rem;
  overflow-x: scroll;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; };
`;

const StyledLi = styled.li<{ $tabWidth: number | null; $isActive: boolean; $beforeInitialize: boolean; }>`
  & {
    display: flex;
    gap: inherit;
    align-items: center;
    flex-grow: 1;
    flex-shrink: 0;

    transition: width 750ms;
    width: ${ props => props.$beforeInitialize ? 'auto' : ( props.$isActive ? `${ props.$tabWidth }px` : '15%' ) };
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

export { StyledTabsContainer };