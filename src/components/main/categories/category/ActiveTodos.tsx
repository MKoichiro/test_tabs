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
import React, { Dispatch, SetStateAction, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

/* --- child components ---------- */
import { ActiveTodo } from './todo/ActiveTodo';
import { GhostTodo } from './todo/GhostTodo';
import { SectionSeparator } from '../../../common/section_separator/SectionSeparator';

/* --- redux --------------------- */
import { useDispatch } from '../../../../providers/redux/store';
import { replaceTodos } from '../../../../providers/redux/slices/categoriesSlice';

/* --- types --------------------- */
import { TodoType } from '../../../../providers/types/categories';

/* --- dnd-kit ------------------- */
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
import { restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers';

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
    isGloballyDraggingState: [boolean, Dispatch<SetStateAction<boolean>>];
}
// =========================================================== TYPE === //

// === FUNCTIONS ====================================================== //
/**
 * @category Custom Hook
 * @param todos
 * @param isGloballyDraggingState
 * @returns
 */
export const useActiveTodos = ({ todos, isGloballyDraggingState }: ActiveTodosProps) => {
    const activeTodos = todos.filter((todo) => !todo.isArchived);

    const dispatch = useDispatch();

    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    const [isGloballyDragging, setIsGloballyDragging] = isGloballyDraggingState;

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

    return {
        activeId,
        activeTodos,
        sensors,
        handleMouseDown,
        handleDragStart,
        handleDragEnd,
        isGloballyDragging,
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
export const ActiveTodos = ({ todos, isGloballyDraggingState }: ActiveTodosProps) => {
    const {
        activeId,
        activeTodos,
        sensors,
        handleMouseDown,
        handleDragStart,
        handleDragEnd,
        isGloballyDragging,
    } = useActiveTodos({ todos, isGloballyDraggingState });

    return (
        <StyledSection>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                // modifiers={[restrictToVerticalAxis]}
            >
                <SortableContext
                    items={todos.filter((todo) => !todo.isArchived)}
                    strategy={verticalListSortingStrategy}
                >
                    <SectionSeparator sectionName="Active" />
                    <ul>
                        {activeTodos.map((todo, i) => (
                            <ActiveTodo
                                key={todo.id}
                                activeTodoIdx={i}
                                todo={todo}
                                isGloballyDragging={isGloballyDragging}
                                handleMouseDown={handleMouseDown}
                            />
                        ))}
                    </ul>
                </SortableContext>
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
        </StyledSection>
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================== //
const StyledSection = styled.section``;
// ========================================================= STYLE === //
