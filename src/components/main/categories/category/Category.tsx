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
import { GhostTodo } from './todo/GhostTodo';

/* --- redux --------------------- */
import { useDispatch } from 'react-redux';
import { replaceTodos } from '../../../../providers/redux/slices/categoriesSlice';

/* --- types --------------------- */
import { CategoryType, TodoType } from '../../../../providers/types/categories';

/* --- dnd-kit ------------------- */
import { createPortal } from 'react-dom';
import { ActiveTodo } from './todo/ActiveTodo';
import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    KeyboardSensor,
    PointerSensor,
    TouchSensor,
    UniqueIdentifier,
    closestCenter,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

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
export const useDndSortable = (todos: TodoType[]) => {
    const dispatch = useDispatch();

    // sensor 登録
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // `<DragOverlay/>` で使用
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    // `<DragOverlay/>` で使用する dragStart event の handler
    const handleDragStart = (e: DragStartEvent) => {
        const { active } = e;
        setActiveId(active.id);
    };

    // dnd-kit/sortable で必須の dragEnd event の handler
    const handleDragEnd = (e: DragEndEvent) => {
        const { active, over } = e;
        if (active.id !== over?.id) {
            const oldIdx = todos.findIndex((todo) => todo.id === active.id);
            const newIdx = todos.findIndex((todo) => todo.id === over?.id);
            dispatch(replaceTodos({ oldIdx, newIdx }));
        }
        setActiveId(null);
    };

    const isGloballyDragging = (activeId !== null);
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


    return { sensors, activeId, handleDragStart, handleDragEnd, isGloballyDragging };
};

/**
 * @summary カテゴリーの情報を取得するためのカスタムフック
 * @param props - カテゴリー情報
 * @returns
 */
export const useCategory = (props: CategoryProps) => {
    const { category } = props;
    const todos = category.todos;
    const { sensors, activeId, handleDragStart, handleDragEnd, isGloballyDragging } = useDndSortable(todos);

    return {
        /** カテゴリーに含まれる todo のリスト */
        todos,
        /** dnd-kit/sortable で使用する sensor のリスト */
        sensors,
        /** ドラッグ中の todo の id */
        activeId,
        /** ドラッグ開始時の handler */
        handleDragStart,
        /** ドラッグ終了時の handler */
        handleDragEnd,

        isGloballyDragging,

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
    const { todos, sensors, activeId, handleDragStart, handleDragEnd, isGloballyDragging } = useCategory(props);

    return (
        <StyledUl>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={todos}
                    strategy={verticalListSortingStrategy}
                >
                    {todos.map(
                        (todo, i) =>
                            !todo.isArchived && (
                                <ActiveTodo
                                    key={todo.id}
                                    activeTodoIdx={i}
                                    todo={todo}
                                    isGloballyDragging={isGloballyDragging}
                                />
                            )
                    )}
                </SortableContext>

                {/* dnd-kit/sortable: createPortalでラップして、
            第二引数に body を指定すればこれを基準に要素が配置されるようになる。
            transform が body 基準になるのでカーソルからずれなくなる。 */}
                {createPortal(
                    <DragOverlay>
                        {activeId ? (
                            <GhostTodo
                                todo={todos.filter((todo) => todo.id === activeId)[0]}
                                isGloballyDragging={isGloballyDragging}
                            />
                        ) : null}
                    </DragOverlay>,
                    document.body
                )}
            </DndContext>
        </StyledUl>
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================= //
const StyledUl = styled.ul``;
// ========================================================= STYLE === //
