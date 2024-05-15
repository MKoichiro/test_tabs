/**
 * @summary Edit Categories Modal で、 isArchived === true のカテゴリを表示する
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
import {
    Slidable,
    SlidableHidden,
    SlidableMain,
} from '../../../../../functions/slidable/Components';
import { useDispatch, useWindowSizeSelector } from '../../../../../providers/redux/store';
import { ArrowUpward, DeleteOutline } from '@mui/icons-material';
import {
    deleteCategory,
    updateCategoryProps,
} from '../../../../../providers/redux/slices/categoriesSlice';
import { vw2px } from '../../../../../utils/converters';
import { useSlidableRegister } from '../../../../../functions/slidable/Hooks';

/* --- dev ----------------------- */
// import { isDebugMode } from '../../../../../utils/adminDebugMode';

// === TYPE =========================================================== //
/**
 * @property archivedCategory - isArchived === true のカテゴリ
 * @category Type of Props
 */
interface ArchivedCategoryProps {
    archivedCategory: CategoryType;
}
// =========================================================== TYPE === //

// === COMPONENT ====================================================== //
/**
 * @param props
 * @returns
 *
 * @renderAs
 * - `<li/>`
 * @example
 * ```tsx
 * <ArchivedCategory archivedCategory={} />
 * ```
 *
 * @category Component
 */
export const ArchivedCategory = ({ archivedCategory }: ArchivedCategoryProps) => {
    const dispatch = useDispatch();

    // slidable hook
    const { contentsWidth } = useWindowSizeSelector();
    const btnsContainerWidth = vw2px(contentsWidth) * 0.33;
    const SLIDABLE_LENGTH = btnsContainerWidth;
    const SLIDABLE_PARAMS = { SLIDABLE_LENGTH };
    const { isSlided, slide, unSlide, register } = useSlidableRegister({
        params: SLIDABLE_PARAMS,
    });

    // handlers
    const handleUnarchiveBtnClick = () => {
        dispatch(
            updateCategoryProps({ categoryId: archivedCategory.id, update: { isArchived: false } })
        );
    };

    const handleDeleteBtnClick = () => {
        dispatch(deleteCategory({ categoryId: archivedCategory.id }));
    };

    return (
        <StyledLi>
            <Slidable {...register}>
                <SlidableMain>
                    <div className="category-name-container">
                        <p>{archivedCategory.name}</p>
                    </div>
                </SlidableMain>

                <SlidableHidden
                    className="btns-container"
                    slidableLength={SLIDABLE_LENGTH}
                >
                    <button
                        className="btn btn-unarchive"
                        onClick={handleUnarchiveBtnClick}
                    >
                        <ArrowUpward />
                    </button>
                    <button
                        className="btn btn-delete"
                        onClick={handleDeleteBtnClick}
                    >
                        <DeleteOutline />
                    </button>
                </SlidableHidden>
            </Slidable>
        </StyledLi>
    );
};
// ====================================================== COMPONENT === //

// === STYLE ========================================================= //
const StyledLi = styled.li<CategoryCommonStylesType>`
    background-color: var(--color-white-3);
    border-radius: 0.2rem;
    width: 95%;
    margin: 0 auto;
    margin-top: 0.8rem;
    .category-name-container {
        margin: 1rem 0;
        p {
            font-size: 2rem;
            line-height: 2em;
            padding-left: 0.8rem;
            @media (width < 600px) {
                font-size: 16px;
            }
        }
    }

    .btns-container {
        display: flex;

        .btn {
            display: block;
            width: 100%;
            margin: 0.2rem;
            border: var(--border-1);
            border-radius: 0.2rem;
            svg {
                color: tomato;
                font-size: 2rem;
            }
        }
        .btn:active {
            scale: 0.95;
            transition: scale 100ms;
        }

        .btn-unarchive {
        }
        .btn-delete {
            border-color: tomato;
        }
    }
`;
// ========================================================= STYLE === //
