/**
 * @summary dnd時にカーソルに追従するghost要素。
 *
 * @issues
 * - なし
 * @copilot
 * - 未確認
 *
 * @module
 */

/* --- react/styled-components --- */
import React, { forwardRef } from 'react';
import styled from 'styled-components';

/* --- child components ---------- */
import { TodoHeader } from './TodoHeader';

/* --- types --------------------- */
import { TodoType } from '../../../../../providers/types/categories';

/* --- dev ----------------------- */
// import { isDebugMode } from '../../../../../utils/adminDebugMode';

// === TYPE =========================================================== //
/**
 * @property todo - todo の情報
 * @property categoryId - todo が所属するカテゴリーの ID
 * @category Type of Props
 */
interface GhostTodoProps {
    todo: TodoType;
    isGloballyDragging: boolean;
}
// =========================================================== TYPE === //

// === COMPONENT ====================================================== //
/**
 * @param props
 * @returns
 *
 * @renderAs
 * - `<div/>`
 * @example
 * ```tsx
 * <GhostTodo todo={} />
 * ```
 *
 * @category Component
 */
export const GhostTodo = forwardRef<HTMLDivElement, GhostTodoProps>((props, ref) => {
    return (
        <StyledDiv ref={ref}>
            <TodoHeader
                attributes={'ghost'}
                todo={props.todo}
                isGloballyDragging={props.isGloballyDragging}
            />
        </StyledDiv>
    );
});
// ====================================================== COMPONENT === //

// === STYLE ========================================================= //
const StyledDiv = styled.div`
    background: grey;

    .gripper {
        padding: 0 0.8rem;
        cursor: grabbing;
    }

    header {
        display: flex;
    }

    .icon-expired {
        color: red;
    }
`;
// ========================================================= STYLE === //
