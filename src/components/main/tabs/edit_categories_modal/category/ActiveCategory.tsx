/**
 * @summary Edit Categories Modal で、 isArchived === false のカテゴリを表示する
 * @issues
 * - なし
 * @copilot
 * - なし
 * @module
 */

/* --- react/styled-components --- */
import React, { MouseEvent, TouchEvent } from 'react';
import styled from 'styled-components';

/* --- types --------------------- */
import { CategoryType } from '../../../../../providers/types/categories';

/* --- styles -------------------- */
import { categoryCommonStyles, CategoryCommonStylesType } from './CategoryCommonStyles';

/* --- material icons ------------ */
import { Inventory2Outlined } from '@mui/icons-material';

/* --- dnd-kit ------------------- */
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

/* --- hooks --------------------- */
/* slidable */
import { Slidable, SlidableMain, SlidableHidden } from '../../../../../functions/slidable/Components';
import { SlidableParams } from '../../../../../functions/slidable/types';
/* immediateEditable */
import { useImmediateInputEditable } from '../../../../../functions/immediateEditable/Hooks_ver2';
import { vw2px } from '../../../../../utils/converters';
import { useDispatch, useWindowSizeSelector } from '../../../../../providers/redux/store';
import { updateCategoryProps } from '../../../../../providers/redux/slices/categoriesSlice';
import { useSlidableRegister } from '../../../../../functions/slidable/Hooks';
import { ControlPanel } from '../../../../common/list_control_panel/ControlPanel';
import { isTouchDevice } from '../../../../../data/constants/constants';
import { BulletIcon } from '../../../../common/btns_icons/bullet_icon/BulletIcon';
import { DragBtn } from '../../../../common/btns_icons/drag_btn/DragBtn';
import {
    activeListCommon,
    draggingItemStyle,
    immediateEditableInput,
    listTitleFont,
    marginBetweenLiEls,
} from '../../../../../globalStyle';

/* --- dev ----------------------- */
// import { isDebugMode } from '../../../../../utils/adminDebugMode';

// === TYPE =========================================================== //
/**
 * @property activeCategory - isArchived === false のカテゴリ
 * @category Type of Props
 */
interface ActiveCategoryProps {
    activeCategory: CategoryType;
    isGloballyDragging: boolean;
    handleMouseDown: (e: MouseEvent | TouchEvent) => void;
}
// =========================================================== TYPE === //

// === FUNCTION ======================================================= //
/**
 * @category Custom Hook
 */
export const useActiveCategory = ({
    activeCategory,
    isGloballyDragging,
}: Pick<ActiveCategoryProps, 'activeCategory' | 'isGloballyDragging'>) => {
    const categoryId = activeCategory.id;
    const dispatch = useDispatch();
    const { contentsWidth, device } = useWindowSizeSelector();

    // slidable 関連
    const btnsContainerWidthPx = vw2px(contentsWidth) * 0.2;
    const SLIDABLE_LENGTH = btnsContainerWidthPx;
    const SLIDABLE_PARAMS: SlidableParams = {
        SLIDABLE_LENGTH,
    };
    const { isSlided, slide, unSlide, register, addSlidableBtn } = useSlidableRegister({
        params: SLIDABLE_PARAMS,
        skipCondition: isGloballyDragging,
    });

    // dnd-kit
    const { transform, transition, isDragging, ...rest } = useSortable({ id: categoryId });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    // archive button handler
    const handleDeleteBtnClick = (): void => {
        dispatch(updateCategoryProps({ categoryId, update: { isArchived: true } }));
    };

    return {
        ...useImmediateInputEditable({ target: activeCategory, targetProperty: 'name' }),
        isDragging,
        ...rest,
        style,
        SLIDABLE_LENGTH,
        handleDeleteBtnClick,
        register,
        isSlided,
        slide,
        addSlidableBtn,
        device,
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
export const ActiveCategory = ({ activeCategory, isGloballyDragging, handleMouseDown }: ActiveCategoryProps) => {
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
        isSlided,
        slide,
        addSlidableBtn,
        device,
    } = useActiveCategory({ activeCategory, isGloballyDragging });

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
                    {/* spサイズのタッチデバイスでは非表示 / pcでもタッチデバイスならリサイズで小さくなっている場合には非表示 */}
                    {!(isTouchDevice && device === 'sp') ? (
                        <>
                            <ControlPanel
                                attrs={['drag', 'slide']}
                                isGloballyDragging={isGloballyDragging}
                                drag={{ handleMouseDown, listeners }}
                                slide={{ isSlided, slide, addSlidableBtn }}
                            />
                            <BulletIcon />
                        </>
                    ) : (
                        <DragBtn
                            className="btn-gripper"
                            listeners={listeners}
                            handleMouseDown={handleMouseDown}
                        />
                    )}

                    <div className="category-name-container">
                        <p
                            className="IE-display"
                            onDoubleClick={handleDoubleClick}
                        >
                            {activeCategory.name}
                        </p>
                        <form
                            className="IE-form"
                            onSubmit={handleSubmit}
                        >
                            <textarea
                                className="IE-edit"
                                ref={inputRef.setRef}
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
interface StyledLiProps {
    $inEditing: boolean;
    $isDragging: boolean;
}
const StyledLi = styled.li<StyledLiProps>`
    ${marginBetweenLiEls()}
    ${activeListCommon({ type: 'category' })}
    ${({ $isDragging }) => draggingItemStyle($isDragging)}

    .slidable-main-contents {
        display: flex;
        align-items: center;

        .category-name-container {
            --num-of-icons: 1;
            --icon-widths: calc(var(--icon-size-1) * var(--num-of-icons));
            width: calc(100% - var(--icon-widths));
            margin: 0.4rem 0.8rem 0.4rem 0;

            ${({ $inEditing }) => immediateEditableInput({ $inEditing })}
            .IE-display {
            }
            .IE-form {
                .IE-edit {
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
