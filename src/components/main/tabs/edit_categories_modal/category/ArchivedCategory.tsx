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
import { CategoryCommonStylesType } from './CategoryCommonStyles';
import {
    Slidable,
    SlidableHidden,
    SlidableMain,
} from '../../../../../functions/slidable/Components';
import { useDispatch, useWindowSizeSelector } from '../../../../../providers/redux/store';
import { ArrowUpward, DeleteOutline, HorizontalRule } from '@mui/icons-material';
import {
    deleteCategory,
    updateCategoryProps,
} from '../../../../../providers/redux/slices/categoriesSlice';
import { vw2px } from '../../../../../utils/converters';
import { useSlidableRegister } from '../../../../../functions/slidable/Hooks';
import { ControlPanel } from '../../../../common/list_control_panel/ControlPanel';
import { isTouchDevice } from '../../../../../data/constants/constants';
import { BulletIcon } from '../../../../common/btns_icons/bullet_icon/BulletIcon';
import { archivedListCommon, listTitleFont, marginBetweenLiEls } from '../../../../../globalStyle';

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
    const { contentsWidth, device } = useWindowSizeSelector();
    const btnsContainerWidth = vw2px(contentsWidth) * 0.33;
    const SLIDABLE_LENGTH = btnsContainerWidth;
    const SLIDABLE_PARAMS = { SLIDABLE_LENGTH };
    const { isSlided, slide, unSlide, addSlidableBtn, register } = useSlidableRegister({
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
                <SlidableMain className="slidable-main-container">
                    {/* spサイズのタッチデバイスでは非表示 / pcでもタッチデバイスならリサイズで小さくなっている場合には非表示 */}
                    {!(isTouchDevice && device === 'sp') && (
                        <ControlPanel
                            attrs={['slide']}
                            slide={{ isSlided, slide, addSlidableBtn }}
                        />
                    )}
                    <BulletIcon />
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
    ${marginBetweenLiEls()}
    ${archivedListCommon({ type: 'category' })}

    .slidable-main-container {
        display: flex;
        .category-name-container {
            --num-of-icons: 1;
            --icon-widths: calc(var(--icon-size-1) * var(--num-of-icons));
            width: calc(100% - var(--icon-widths));
            margin: 0.4rem 5rem 0.4rem 0;

            > * {
                ${listTitleFont()}
            }
            p {
                // 半角英数字の文字列、の場合にも折り返しを行う
                overflow-wrap: break-word;
                word-wrap: break-word;
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
