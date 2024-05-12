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
import { CategoryType } from '../../../../providers/types/categories';

/* --- dnd-kit ------------------- */
import { createPortal } from 'react-dom';
import { ActiveTodo } from './todo/ActiveTodo';
import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    KeyboardSensor,
    MouseSensor,
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
import { ArchivedTodo } from './todo/ArchivedTodo';
import { DirectionsWalkOutlined, Inventory2Outlined } from '@mui/icons-material';

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
    const dispatch = useDispatch();

    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    const [isGloballyDragging, setIsGloballyDragging] = useState(false);

    // sensor 登録
    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // handlers
    const handleMouseDown = () => {
        setIsGloballyDragging(true);
    };

    const handleDragStart = (e: DragStartEvent) => {
        const { active } = e;
        setActiveId(active.id);
    };

    const handleDragEnd = (e: DragEndEvent) => {
        const { active, over } = e;
        if (active.id !== over?.id) {
            const oldIdx = todos.findIndex((todo) => todo.id === active.id);
            const newIdx = todos.findIndex((todo) => todo.id === over?.id);
            dispatch(replaceTodos({ oldIdx, newIdx }));
        }
        setActiveId(null);
        setIsGloballyDragging(false);
    };

    // const isGloballyDragging = (activeId !== null);
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
        sensors,
        activeId,
        handleDragStart,
        handleDragEnd,
        isGloballyDragging,
        handleMouseDown,
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
    const {
        todos,
        sensors,
        activeId,
        handleDragStart,
        handleDragEnd,
        isGloballyDragging,
        handleMouseDown,
    } = useCategory(props);

    return (
        <StyledUl>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={todos.filter((todo) => !todo.isArchived)}
                    strategy={verticalListSortingStrategy}
                >
                    <span className="attr-separator">
                        <DirectionsWalkOutlined />
                        <span className="attr-name">Active</span>
                    </span>
                    {todos
                        .filter((todo) => !todo.isArchived)
                        .map((todo, i) => (
                            <ActiveTodo
                                key={todo.id}
                                activeTodoIdx={i}
                                todo={todo}
                                isGloballyDragging={isGloballyDragging}
                                handleMouseDown={handleMouseDown}
                            />
                        ))}
                </SortableContext>

                <div>
                    <span className="attr-separator">
                        <Inventory2Outlined />
                        <span className="attr-name">Archive</span>
                    </span>
                    {todos
                        .filter((todo) => todo.isArchived)
                        .map((todo, i) => (
                            <ArchivedTodo
                                key={todo.id}
                                activeTodoIdx={i}
                                todo={todo}
                                isGloballyDragging={isGloballyDragging}
                            />
                        ))}
                </div>

                {/* dnd-kit/sortable: createPortalでラップして、
                第二引数に body を指定すればこれを基準に要素が配置されるようになる。
                transform が body 基準になるのでカーソルからずれなくなる。 */}
                {createPortal(
                    <DragOverlay>
                        {isGloballyDragging ? (
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
const StyledUl = styled.ul`
    .attr-separator {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 2.4rem;
        margin: 0 1.6rem;

        &::before,
        &::after {
            content: '';
            display: block;
            flex: 1;
            height: var(--border-weight);
            background-color: var(--color-black-1);
        }
        &::before {
            margin-right: 1.6rem;
        }
        &::after {
            margin-left: 1.6rem;
        }

        svg {
            font-size: 2rem;
            color: var(--color-black-1);
        }

        .attr-name {
            font-size: 1.6rem;
            letter-spacing: 0.1rem;
            font-weight: 700;
            color: var(--color-black-1);
            margin-left: 0.8rem;
        }
    }
`;
// ========================================================= STYLE === //
