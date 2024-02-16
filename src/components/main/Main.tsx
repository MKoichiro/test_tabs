/* Main Component */

/* react 関連 */
import React, { FC, useState } from 'react'; // 他の hooks も必要に応じてここでimport
/* styled-components 関連 */
import styled from 'styled-components';
/* 子Component */
import { StyledTabsContainer as TabsContainer } from './TabsContainer';
import Contents from './Contents';

interface MainProps {
	className?: string;
}
interface categoryType { id: number, name: string }
const categories: categoryType[] = [
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
const Main: FC<MainProps> = (props) => {
	const [activeIndex, setActiveIndex]   = useState(0);
  const [tabWidthList, setTabWidthList] = useState<(number | null)[]>(new Array(categories.length).fill(null));
	// ここにいろいろ書く

	return (
		<div className = { props.className }>
			<h1 children="Main" />
			<div>
				<TabsContainer
					categories = { categories }
					activeIndex = { activeIndex }
					updateActiveIndex = { setActiveIndex }
					tabWidthList = { tabWidthList }
					updateTabWidthList = { setTabWidthList } />
				<Contents />
			</div>
		</div>
	);
};
// ============================================= component 定義部分 === //

// === style 定義部分 ================================================= //
const StyledMain = styled(Main)`
	width: 70%;
	margin: 0 auto;
`;
// ================================================= style 定義部分 === //

export { StyledMain };