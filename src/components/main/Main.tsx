/* Main Component */

/* --- react/styled-components --- */
import React, { FC } from 'react';
import styled from 'styled-components';
/* --- child components ---------- */
import { TabsContainer } from './tabs/TabsContainer';
import { CategoriesContainer } from './categories/CategoriesContainer';
import { CreateNewTodo } from './create_new_todo/CreateNewTodo';


// === 型定義部分 ===================================================== //
// - component props
interface MainType {}
// - others
// ===================================================== 型定義部分 === //


// === component 定義部分 ============================================= //

export const Main: FC<MainType> = (props) => {
	const {} = props;

	return (
		<StyledMain>
			<h1 children="Main" />
			<section className="todos-display-container">
				<TabsContainer />
				<CategoriesContainer />
			</section>
			<section className="form-create-new-todos-container">
				<CreateNewTodo />				{/* = form */}
			</section>
		</StyledMain>
	);
};
// ============================================= component 定義部分 === //


// === style 定義部分 ================================================= //
const StyledMain = styled.main`
	width: var(--contents-width);
	margin: 0 auto;
`;
// ================================================= style 定義部分 === //