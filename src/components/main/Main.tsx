/**
 * @summary Main component
 * `<main/>`内のコンテンツの表示を担当するコンポーネント
 *
 * @issues
 * - なし
 * @copilot
 * > まずはsection要素を新たなコンポーネントとして定義します。これにより、コードの可読性が向上し、テストも容易になります。
 * - 十分に分割されているため、不採用。
 * @module
 */

/* --- react/styled-components --- */
import React from 'react';
import styled from 'styled-components';

/* --- child components ---------- */
import { Tabs } from './tabs/Tabs';
import { CategoriesContainer } from './categories/CategoriesContainer';
import { CreateNewTodo } from './create_new_todo/CreateNewTodo';

/* --- dev ----------------------- */
// import { isDebugMode } from '../../utils/adminDebugMode';

// === TYPE =========================================================== //

// =========================================================== TYPE === //

// === COMPONENT ====================================================== //
/**
 * @param props
 * @returns
 * 
 * @renderAs
 * - `<main/>`
 * @example
 * ```tsx
 * <Main />
 * ```
 *
 * @category Component
 */
export const Main = () => {
    return (
        <StyledMain>
            <section className="todos-display-container">
                <Tabs />
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
