/* Main Component */

// all tabの実装
// kanban viewの実装
// locationの実装
// googleカレンダーとの連携
// dnd-kit todo部分に
// form 履歴から入力
// dnd-kit sort

/* react 関連 */
import React, { FC } from 'react';
/* styled-components 関連 */
import styled from 'styled-components';

import { StyledTabsContainer as TabsContainer } from './TabsContainer';
import AllTodosContainer from './AllTodosContainer';
import CreateNewTodo from './CreateNewTodo';
import { EditCategories } from './editCategoriesModal/EditCategoriesModal';


// === component 定義部分 ============================================= //
interface MainProps {
	className?: string;
}
const Main: FC<MainProps> = (props) => {
	const { className } = props;

	return (
		<main className = { className }>
			<h1 children="Main" />
			<section className="todos-display-container">
				<TabsContainer />
				<AllTodosContainer />
			</section>
			<section className="form-create-new-todos-container">
				<CreateNewTodo />				{/* = form */}
			</section>
			<section className="edit-categories-modal">
				<EditCategories />	{/* = div */}
			</section>
		</main>
	);
};
// ============================================= component 定義部分 === //

// === style 定義部分 ================================================= //
const StyledMain = styled(Main)`
	width: var(--contents-width);
	margin: 0 auto;
`;
// ================================================= style 定義部分 === //

export { StyledMain };