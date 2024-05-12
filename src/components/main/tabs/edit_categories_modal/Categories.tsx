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
import React, { useState } from 'react';
import styled from 'styled-components';

/* --- child components ---------- */
import { ActiveCategory } from './category/ActiveCategory';
import { ArchivedCategory } from './category/ArchivedCategory';
import { GhostCategory } from './category/GhostCategory';

/* --- redux --------------------- */
import { useDispatch, useCategoriesSelector } from '../../../../providers/redux/store';
import {
    switchCategory,
    updateCategories,
} from '../../../../providers/redux/slices/categoriesSlice';

/* --- dnd-kit ------------------- */
import {
    DndContext,
    closestCenter,
    TouchSensor,
    KeyboardSensor,
    useSensor,
    useSensors,
    PointerSensor,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    UniqueIdentifier,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchive } from '@fortawesome/free-solid-svg-icons';
import { DirectionsWalkOutlined, Inventory2Outlined } from '@mui/icons-material';

/* --- dev ----------------------- */
// import { isDebugMode } from '../../../../utils/adminDebugMode';

// === TYPE =========================================================== //
// interface CategoriesProps {}
// =========================================================== TYPE === //

// === FUNCTION ======================================================= //
/**
 * {@link useCategories} のヘルパー。dnd-kit のソート機能を提供する。
 * ActiveTodoでの処理と被っているので、使いまわせるようにしたい。
 * @category Custom Hook
 */
export const useDndSortable = () => {
    const { categoriesEntity: categories } = useCategoriesSelector();
    const dispatch = useDispatch();

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const [isDragging, setIsDragging] = useState(false);
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

    const handleDragStart = (e: DragStartEvent) => {
        const { active } = e;
        setActiveId(active.id);
        setIsDragging(true);
    };

    const handleDragEnd = (e: DragEndEvent) => {
        const { active, over } = e;
        if (active.id !== over?.id) {
            const oldIndex = categories.findIndex((categories) => categories.id === active.id);
            const newIndex = categories.findIndex((categories) => categories.id === over?.id);
            const newCategories = arrayMove(categories, oldIndex, newIndex);
            dispatch(updateCategories(newCategories));
            dispatch(switchCategory(newIndex));
        }
        setActiveId(null);
        setIsDragging(false);
    };

    return {
        sensors,
        isDragging,
        activeId,
        handleDragStart,
        handleDragEnd,
    };
};

/**
 * @category Custom Hook
 */
export const useCategories = () => {
    const { categoriesEntity: categories } = useCategoriesSelector();
    const activeCategories = categories.filter((category) => !category.isArchived);
    const archivedCategories = categories.filter((category) => category.isArchived);

    return {
        ...useDndSortable(),
        categories,
        activeCategories,
        archivedCategories,
    };
};
// ======================================================= FUNCTION === //

// === COMPONENT ====================================================== //
/**
 * @param props
 * @returns
 * 
 * @renderAs
 * - `<div/>`
 * @example
 * ```tsx
 * <Categories />
 * ```
 *
 * @category Component
 */
export const Categories = () => {
    const {
        sensors,
        activeId,
        handleDragStart,
        handleDragEnd,
        categories,
        activeCategories,
        archivedCategories,
    } = useCategories();

    return (
        <StyledDiv>
            <ul>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    {/* ActiveCategory: 常時表示、ul内に収まってドロップ位置を示唆する要素 */}
                    <SortableContext
                        items={categories}
                        strategy={verticalListSortingStrategy}
                    >
                        <span className="attr-separator">
                            <DirectionsWalkOutlined />
                            <span className="attr-name">Active</span>
                        </span>

                        {categories.filter((category) => !category.isArchived).map((category) => (
                            <ActiveCategory
                                key={category.id}
                                activeCategory={category}
                            />
                        ))}
                    </SortableContext>

                    {/* GhostCategory: drag中のみ表示、カーソルやタッチ位置に追従するゴースト要素 */}
                    <DragOverlay>
                        {activeId ? (
                            <GhostCategory
                                draggingCategory={
                                    categories.filter((category) => category.id === activeId)[0]
                                }
                            />
                        ) : null}
                    </DragOverlay>
                </DndContext>
            </ul>

            <span className="attr-separator">
                <Inventory2Outlined />
                <span className="attr-name">Archive</span>
            </span>
            <ul className="archived-categories-container">
                {/* ArchivedCategory:  */}
                {archivedCategories.map((category) => (
                    <ArchivedCategory
                        key={category.id}
                        archivedCategory={category}
                    />
                ))}
            </ul>
        </StyledDiv>
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================= //
const StyledDiv = styled.div`
    --fs-category-name: 2rem;
    font-size: var(--fs-category-name);

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
            margin-left:.8rem;
        }
    }
`;
// ========================================================= STYLE === //
