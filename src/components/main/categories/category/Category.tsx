/**
 * @summary アクティブなカテゴリーのtodosを表示する部分（メインビューとなる部分）
 *
 * @issues
 * - IF_POSSIBLE: ドラッグ中はすべてのtodoを一時的に閉じる。（isOpen状態を一時的にfalseにするともとに戻すのがめんどくさそう。heightを一律で変えるようにすると楽かも）
 *
 * @copilot
 * - なし
 *
 * @module
 */

/* --- react/styled-components --- */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

/* --- child components ---------- */
import { ActiveTodos } from './ActiveTodos';
import { ArchivedTodos } from './ArchivedTodos';

/* --- types --------------------- */
import { CategoryType } from '../../../../providers/types/categories';


/* --- dev ----------------------- */
// import { isDebugMode } from '../../../../utils/adminDebugMode';

// === TYPE =========================================================== //
/**
 * @property category - categoriesSlice から取得したカテゴリー情報
 * @category Type of Props
 */
interface CategoryProps {
    category: CategoryType;
}
// =========================================================== TYPE === //

// === FUNCTIONS ====================================================== //
/**
 * @summary dnd-kit/sortable を使用するためのカスタムフック。{@link useCategory} のヘルパー。
 * @param todos - カテゴリーに含まれる todo のリスト
 * @returns
 */
export const useCategory = (props: CategoryProps) => {
    const { category } = props;
    const todos = category.todos;

    const isGloballyDraggingState = useState(false);
    const [isGloballyDragging] = isGloballyDraggingState;

    // ドラッグ中はユーザー選択を無効化。
    // ドラッグ中に停止していると長押し判定が出て意図せず選択されてしまうため。
    // 完ぺきではないが、これでかなりその挙動が低減される。
    useEffect(() => {
        if (isGloballyDragging) {
            document.documentElement.classList.add('no-user-select');
        } else {
            document.documentElement.classList.remove('no-user-select');
        }
    }, [isGloballyDragging]);

    return {
        todos,
        isGloballyDraggingState,
    };
};
// ====================================================== FUNCTIONS === //

// === COMPONENT ====================================================== //
/**
 * @summary カテゴリーのメインビュー部分
 * @param props
 * @returns
 */
export const Category = (props: CategoryProps) => {
    const { todos, isGloballyDraggingState } = useCategory(props);

    return (
        <StyledUl>
            <ActiveTodos
                todos={todos}
                isGloballyDraggingState={isGloballyDraggingState}
            />

            <ArchivedTodos
                todos={todos}
                isGloballyDraggingState={isGloballyDraggingState}
            />
        </StyledUl>
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================== //
const StyledUl = styled.ul``;
// ========================================================= STYLE === //
