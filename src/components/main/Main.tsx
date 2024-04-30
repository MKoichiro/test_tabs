/* --- react/styled-components --- */
import React, { FC } from 'react';
import styled from 'styled-components';
/* --- child components ---------- */
import { TabsContainer } from './tabs/TabsContainer';
import { CategoriesContainer } from './categories/CategoriesContainer';
import { CreateNewTodo } from './create_new_todo/CreateNewTodo';
/* --- dev ----------------------- */
// import { isDebugMode } from '../../utils/adminDebugMode';

// === TYPE =========================================================== //
// - PROPS
// - STYLE
// - OTHERS
// =========================================================== TYPE === //

// === COMPONENT ====================================================== //
/**
 * Categories を表示する Tab 部分から、新規 TODO を作成する部分までをまとめた Main コンポーネント。
 *
 * @returns
 */
export const Main: FC = () => {
    return (
        <StyledMain>
            <section className="todos-display-container">
                <TabsContainer />
                <CategoriesContainer />
            </section>
            <section className="form-create-new-todos-container">
                <CreateNewTodo />
            </section>
        </StyledMain>
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================= //
const StyledMain = styled.main`
    width: var(--contents-width);
    margin: 0 auto;
`;
// ========================================================= STYLE === //
