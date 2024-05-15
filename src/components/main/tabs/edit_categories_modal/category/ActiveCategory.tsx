/**
 * @summary Edit Categories Modal で、 isArchived === false のカテゴリを表示する
 * @issues
 * - なし
 * @copilot
 * - なし
 * @module
 */

/* --- react/styled-components --- */
import React from 'react';
import styled from 'styled-components';

/* --- types --------------------- */
import { CategoryType } from '../../../../../providers/types/categories';

/* --- styles -------------------- */
import { categoryCommonStyles, CategoryCommonStylesType } from './CategoryCommonStyles';

/* --- material icons ------------ */
import { DragIndicator, Inventory2Outlined } from '@mui/icons-material';

/* --- dnd-kit ------------------- */
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

/* --- hooks --------------------- */
/* slidable */
import {
    Slidable,
    SlidableMain,
    SlidableHidden,
} from '../../../../../functions/slidable/Components';
import { SlidableParams } from '../../../../../functions/slidable/types';
/* immediateEditable */
import { useImmediateEditable } from '../../../../../functions/immediateEditable/Hooks';
import { vw2px } from '../../../../../utils/converters';
import { useDispatch, useWindowSizeSelector } from '../../../../../providers/redux/store';
import { updateCategoryProps } from '../../../../../providers/redux/slices/categoriesSlice';
import { useSlidableRegister } from '../../../../../functions/slidable/Hooks';

/* --- dev ----------------------- */
// import { isDebugMode } from '../../../../../utils/adminDebugMode';

// === TYPE =========================================================== //
/**
 * @property activeCategory - isArchived === false のカテゴリ
 * @category Type of Props
 */
interface ActiveCategoryProps {
    activeCategory: CategoryType;
}
// =========================================================== TYPE === //

// === FUNCTION ======================================================= //
/**
 * @category Custom Hook
 */
export const useActiveCategory = ({ activeCategory }: ActiveCategoryProps) => {
    const categoryId = activeCategory.id;
    const dispatch = useDispatch();
    const { contentsWidth } = useWindowSizeSelector();

    // slidable 関連
    const btnsContainerWidthPx = vw2px(contentsWidth) * 0.2;
    const SLIDABLE_LENGTH = btnsContainerWidthPx;
    const SLIDABLE_PARAMS: SlidableParams = {
        SLIDABLE_LENGTH,
    };
    const { isSlided, slide, unSlide, register } = useSlidableRegister({
        params: SLIDABLE_PARAMS,
    });

    // dnd-kit
    const { transform, transition, ...rest } = useSortable({ id: categoryId });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    // archive button handler
    const handleDeleteBtnClick = (): void => {
        dispatch(updateCategoryProps({ categoryId, update: { isArchived: true } }));
    };

    return {
        ...useImmediateEditable({ target: activeCategory, targetProperty: 'name' }),
        ...rest,
        style,
        SLIDABLE_LENGTH,
        handleDeleteBtnClick,
        register,
    };
};
// ======================================================= FUNCTION === //

// === COMPONENT ====================================================== //
/**
 * @param props
 * @returns
 * @renderAs
 * - `<li/>`
 * @example
 * ```tsx
 * <ActiveCategory activeCategory={} />
 * ```
 * @category Component
 */
export const ActiveCategory = ({ activeCategory }: ActiveCategoryProps) => {
    const {
        inEditing,
        inputRef,
        handleDoubleClick,
        handleSubmit,
        handleChange,
        handleBlur,

        isDragging,
        listeners,
        attributes,
        setNodeRef,
        style,
        SLIDABLE_LENGTH,
        handleDeleteBtnClick,
        register,
    } = useActiveCategory({ activeCategory });

    return (
        <StyledLi
            ref={setNodeRef}
            style={style}
            $inEditing={inEditing}
            $isDragging={isDragging}
            {...attributes}
        >
            <Slidable {...register}>
                <SlidableMain className="slidable-main-contents">
                    <span
                        className="gripper"
                        {...listeners}
                    >
                        <DragIndicator />
                    </span>
                    <div className="category-name-container">
                        <p onDoubleClick={handleDoubleClick}>{activeCategory.name}</p>
                        <form onSubmit={handleSubmit}>
                            <input
                                type={'text'}
                                ref={inputRef}
                                value={activeCategory.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </form>
                    </div>
                </SlidableMain>

                <SlidableHidden
                    className="slidable-hidden-contents"
                    slidableLength={SLIDABLE_LENGTH}
                >
                    <button
                        className="btn-archive"
                        onClick={handleDeleteBtnClick}
                    >
                        <Inventory2Outlined />
                    </button>
                </SlidableHidden>
            </Slidable>
        </StyledLi>
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================= //
const StyledLi = styled.li<CategoryCommonStylesType>`
    margin-top: 0.8rem;
    padding-right: 0.8rem;
    touch-action: auto;
    background-color: var(--color-white-2);

    .slidable-main-contents {
        ${categoryCommonStyles}

        opacity: ${(props) => (props.$isDragging ? 0.5 : 1)};
        .gripper {
            touch-action: none;
            cursor: grab;
        }

        .category-name-container {
            border-bottom: ${({ $inEditing }) =>
                $inEditing ? 'var(--border-1)' : 'var(--border-weight) solid transparent'};
            margin: 1rem 0;
            > * {
                font-size: 2rem;
                line-height: 2em;
                @media (width < 600px) {
                    font-size: 16px;
                }
            }
            p {
                display: ${(props) => (props.$inEditing ? 'none' : 'block')};
            }
            form {
                display: ${(props) => (props.$inEditing ? 'block' : 'none')};
                input {
                    width: 100%;
                    outline: none;
                    border: none;
                    border-radius: 0;
                    background: none;
                }
            }
        }
    }
    .slidable-hidden-contents {
        display: flex;
        .btn-archive {
            display: block;
            width: 100%;
            margin: 0.4rem;
            border: var(--border-1);
            border-radius: 0.2rem;
            svg {
                color: tomato;
                font-size: 2rem;
            }
        }
        .btn-archive:active {
            scale: 0.95;
            transition: scale 100ms;
        }
    }
`;
// ========================================================= STYLE === //
