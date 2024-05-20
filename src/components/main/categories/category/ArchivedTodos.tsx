/**
 * @summary hogehoge
 *
 * @issues
 * - TODO: hogehoge
 * - IF_POSSIBLE: hogehoge
 *
 * @copilot
 * > hogehoge
 *
 * @module
 */

/* --- react/styled-components --- */
import React from 'react';
import styled from 'styled-components';

/* --- child components ---------- */
import { ArchivedTodo } from './todo/ArchivedTodo';
import { SectionSeparator } from '../../../common/section_separator/SectionSeparator';

/* --- types --------------------- */
import { TodoType } from '../../../../providers/types/categories';
import { Inventory2Outlined } from '@mui/icons-material';

/* --- dev ----------------------- */
// import { isDebugMode } from '../../../../utils/adminDebugMode';

// === TYPE =========================================================== //
/**
 * @property todos - カテゴリー内のタスク情報
 * @property isGloballyDraggingState - グローバルなドラッグ状態
 * @category Type of Props
 */
interface ActiveTodosProps {
    todos: TodoType[];
    isGloballyDraggingState: [boolean, (newState: boolean) => void];
}
// =========================================================== TYPE === //

// === FUNCTIONS ====================================================== //
/**
 * @category Custom Hook
 * @param todos
 * @returns
 */
export const useArchivedTodos = (todos: TodoType[]) => {
    const archivedTodos = todos.filter((todo) => todo.isArchived);

    return {
        archivedTodos,
    };
};
// ====================================================== FUNCTIONS === //

// === COMPONENT ====================================================== //
/**
 * @param props
 * @returns
 *
 * @renderAs
 * - `<section/>`
 * @example
 * ```tsx
 * <ActiveTodos todos={} />
 * ```
 *
 * @category Component
 */
export const ArchivedTodos = ({ todos, isGloballyDraggingState }: ActiveTodosProps) => {
    const [isGloballyDragging] = isGloballyDraggingState;
    const { archivedTodos } = useArchivedTodos(todos);

    return (
        <StyledSection>
            <SectionSeparator
                sectionName="Archive"
                icon={<Inventory2Outlined />}
            />
            <ul className="archived-todos-container">
                {archivedTodos.map((todo, i) => (
                    <ArchivedTodo
                        key={todo.id}
                        activeTodoIdx={i}
                        todo={todo}
                        isGloballyDragging={isGloballyDragging}
                    />
                ))}
            </ul>
        </StyledSection>
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================== //
const StyledSection = styled.section``;
// ========================================================= STYLE === //
