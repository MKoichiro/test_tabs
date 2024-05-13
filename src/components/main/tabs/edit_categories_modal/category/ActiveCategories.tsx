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
    arrayMove,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

/* --- child components ---------- */
import { ActiveCategory } from './ActiveCategory';
import { GhostCategory } from './GhostCategory';

/* --- types ---------------------- */
import { CategoryType } from '../../../../../providers/types/categories';

/* --- redux --------------------- */
import { useCategoriesSelector, useDispatch } from '../../../../../providers/redux/store';
import {
    switchCategory,
    updateCategories,
} from '../../../../../providers/redux/slices/categoriesSlice';

/* --- MUI ------------------------ */
import { DirectionsWalkOutlined } from '@mui/icons-material';
import { SectionSeparator } from '../../../../common/modal/section_separator/SectionSeparator';

/* --- dev ----------------------- */
// import { isDebugMode } from '../../../../../utils/adminDebugMode';

// === TYPE =========================================================== //
interface ActiveCategoriesProps {
    activeCategories: CategoryType[];
}
// =========================================================== TYPE === //

// === FUNCTION ======================================================= //
/**
 * @category Custom Hook
 */
export const useActiveCategories = () => {
    const { categoriesEntity: categories } = useCategoriesSelector();
    const dispatch = useDispatch();

    const sensors = useSensors(
        useSensor(MouseSensor),
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
// ======================================================= FUNCTION === //

// === COMPONENT ====================================================== //
/**
 * @param props
 * @returns
 *
 * @renderAs
 * - `<section/>`
 * @example
 * ```tsx
 * <ActiveCategories activeCategories={} />
 * ```
 *
 * @category Component
 */
export const ActiveCategories = ({ activeCategories }: ActiveCategoriesProps) => {
    const { sensors, activeId, handleDragStart, handleDragEnd } = useActiveCategories();

    return (
        <StyledSection>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <SectionSeparator sectionName="Active" />
                {/* ActiveCategory: 常時表示、ul内に収まってドロップ位置を示唆する要素 */}
                <SortableContext
                    items={activeCategories}
                    strategy={verticalListSortingStrategy}
                >
                    <ul className="active-categories-container">
                        {activeCategories.map((category) => (
                            <ActiveCategory
                                key={category.id}
                                activeCategory={category}
                            />
                        ))}
                    </ul>
                </SortableContext>

                {/* GhostCategory: drag中のみ表示、カーソルやタッチ位置に追従するゴースト要素 */}
                <DragOverlay>
                    {activeId ? (
                        <GhostCategory
                            draggingCategory={
                                activeCategories.filter((category) => category.id === activeId)[0]
                            }
                        />
                    ) : null}
                </DragOverlay>
            </DndContext>
        </StyledSection>
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================== //
const StyledSection = styled.section`
    .active-categories-container {
        margin-top: 1.6rem;
    }
`;
// ========================================================= STYLE === //
