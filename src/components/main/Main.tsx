/* Main Component */

/* react 関連 */
import React, { FC } from 'react';
/* styled-components 関連 */
import styled from 'styled-components';

import { TabsContainer } from './tabs/TabsContainer';
import { AllTodosContainer } from './all_todos/AllTodosContainer';
import { CreateNewTodo } from './CreateNewTodo';


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