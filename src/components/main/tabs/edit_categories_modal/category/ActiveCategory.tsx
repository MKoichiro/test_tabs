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

/* --- utils --------------------- */
import { vw2px } from '../../../../../utils/converters';

/* --- font awesome -------------- */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchive } from '@fortawesome/free-solid-svg-icons';

/* --- material icons ------------ */
import { DragIndicator } from '@mui/icons-material';

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
import { SlidableParamsType } from '../../../../../functions/slidable/Types';
/* immediateEditable */
import { useImmediateEditable } from '../../../../../functions/immediateEditable/Hooks';

/* --- dev ----------------------- */
// import { isDebugMode } from '../../../../../utils/adminDebugMode';

// === CONSTANT Against RENDERING ===================================== //
const btnsContainerWidthVw = 10;
const btnsContainerWidthPx = vw2px(btnsContainerWidthVw);
// slidable 関連
const slidableParams: SlidableParamsType = {
    SLIDABLE_LENGTH: btnsContainerWidthPx,
    GRADIENT_THRESHOLD: 1 / 2,
    TOGGLE_THRESHOLD: btnsContainerWidthPx / 2,
    COMPLEMENT_ANIME_DURATION: 300,
};
// ===================================== CONSTANT Against RENDERING === //

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
    const { transform, transition, ...rest } = useSortable({ id: activeCategory.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return {
        ...useImmediateEditable({ target: activeCategory, targetProperty: 'name' }),
        ...rest,
        style,
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
    } = useActiveCategory({ activeCategory });

    return (
        <StyledLi
            ref={setNodeRef}
            style={style}
            $inEditing={inEditing}
            $isDragging={isDragging}
            {...attributes}
        >
            <Slidable slidableParams={slidableParams}>
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
                    slidableLength={slidableParams.SLIDABLE_LENGTH}
                >
                    <button>
                        <FontAwesomeIcon icon={faArchive} />
                    </button>
                </SlidableHidden>
            </Slidable>
        </StyledLi>
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================= //
const StyledLi = styled.li<CategoryCommonStylesType>`
    touch-action: auto;

    .slidable-main-contents {
        ${categoryCommonStyles}

        opacity: ${(props) => (props.$isDragging ? 0.5 : 1)};
        .gripper {
            touch-action: none;
            cursor: grab;
        }

        .category-name-container {
            border-bottom: ${(props) =>
                props.$inEditing ? '2px solid #000' : '2px solid transparent'};
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
        background: violet;
        display: flex;
        align-items: center;
        button {
            display: block;
            flex: 1;
        }
    }
`;
// ========================================================= STYLE === //
