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
import React, { useEffect, useState } from 'react';
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
import { switchCategory, updateCategories } from '../../../../../providers/redux/slices/categoriesSlice';

/* --- MUI ------------------------ */
import { SectionSeparator } from '../../../../common/section_separator/SectionSeparator';
import { DirectionsWalkOutlined } from '@mui/icons-material';

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
    const [isGloballyDragging, setIsGloballyDragging] = useState(false);

    const handleMouseDown = () => {
        setIsGloballyDragging(true);
    };

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
        setIsGloballyDragging(false);
    };

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
        sensors,
        isDragging,
        activeId,
        handleMouseDown,
        handleDragStart,
        handleDragEnd,
        isGloballyDragging,
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
    const { sensors, activeId, handleMouseDown, handleDragStart, handleDragEnd, isGloballyDragging } =
        useActiveCategories();

    return (
        <StyledSection>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <SectionSeparator
                    sectionName="Active"
                    icon={<DirectionsWalkOutlined />}
                    marginTop="0px"
                />
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
                                isGloballyDragging={isGloballyDragging}
                                handleMouseDown={handleMouseDown}
                            />
                        ))}
                    </ul>
                </SortableContext>

                {/* GhostCategory: drag中のみ表示、カーソルやタッチ位置に追従するゴースト要素 */}
                <DragOverlay>
                    {activeId ? (
                        <GhostCategory
                            draggingCategory={activeCategories.filter((category) => category.id === activeId)[0]}
                        />
                    ) : null}
                </DragOverlay>
            </DndContext>
        </StyledSection>
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================== //
const StyledSection = styled.section``;
// ========================================================= STYLE === //
