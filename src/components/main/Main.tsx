/* Main Component */

/* react 関連 */
import React, { FC } from 'react'; // 他の hooks も必要に応じてここでimport
/* styled-components 関連 */
import styled from 'styled-components';
/* 子Component */
import { StyledTabsContainer as TabsContainer } from './TabsContainer';
import AllTodosContainer from './AllTodosContainer';
import CreateNew from './CreateNewTodo';
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
				<CreateNew />				{/* = form */}
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